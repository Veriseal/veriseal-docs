param(
  [Parameter(Mandatory=$true)]
  [string]$BackupRoot
)

function ReadRaw($p){
  if(!(Test-Path $p)){ return $null }
  return [System.IO.File]::ReadAllText($p)
}

function WriteUtf8NoBom($p, $text){
  $enc = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($p, $text, $enc)
}

function StripFrontMatters($text){
  if($null -eq $text){ return $null }

  # remove actual BOM and common "Ã¯Â»Â¿" artifact
  $t = $text
  $t = $t -replace "^\uFEFF", ""
  $t = $t -replace "^(Ã¯Â»Â¿)+", ""

  # remove 1st front matter if present
  if($t -match "^\s*---\s*\r?\n"){
    $t = [regex]::Replace($t, "^\s*---\s*\r?\n.*?\r?\n---\s*\r?\n", "", "Singleline")
  }

  # remove a 2nd front matter if it was duplicated (common corruption)
  $t2 = $t -replace "^\uFEFF", ""
  $t2 = $t2 -replace "^(Ã¯Â»Â¿)+", ""
  if($t2 -match "^\s*---\s*\r?\n"){
    $t = [regex]::Replace($t2, "^\s*---\s*\r?\n.*?\r?\n---\s*\r?\n", "", "Singleline")
  }

  return $t.TrimStart()
}

function GetFrontMatter($text){
  if($null -eq $text){ return $null }
  $t = $text -replace "^\uFEFF",""
  if($t -match "^\s*---\s*\r?\n"){
    $m = [regex]::Match($t, "^\s*---\s*\r?\n.*?\r?\n---\s*\r?\n", "Singleline")
    if($m.Success){ return $m.Value.TrimEnd() }
  }
  return $null
}

$backupI18n = Join-Path $BackupRoot "i18n"
if(!(Test-Path $backupI18n)){
  throw "Backup i18n folder not found: $backupI18n"
}

# 1) Restore docs bodies
$newDocs = Get-ChildItem -Recurse .\i18n -Filter *.md -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -like "*docusaurus-plugin-content-docs*\\current\\*" }

$restored = 0
foreach($f in $newDocs){
  $rel = $f.FullName.Substring((Resolve-Path ".\i18n").Path.Length).TrimStart("\")
  $old = Join-Path $backupI18n $rel

  $oldRaw = ReadRaw $old
  if($null -eq $oldRaw){ continue }

  $newRaw = ReadRaw $f.FullName
  $fm = GetFrontMatter $newRaw
  if($null -eq $fm){
    # if new file has no FM (rare), keep as-is
    continue
  }

  $body = StripFrontMatters $oldRaw
  $out = $fm + "`n`n" + $body + "`n"
  WriteUtf8NoBom $f.FullName $out
  $restored++
}

Write-Host "Docs restored (body only): $restored"

# 2) Restore JSON translation files (safe copy)
$jsonFiles = Get-ChildItem -Recurse $backupI18n -Filter *.json -ErrorAction SilentlyContinue
$copied = 0
foreach($j in $jsonFiles){
  $rel = $j.FullName.Substring((Resolve-Path $backupI18n).Path.Length).TrimStart("\")
  $dest = Join-Path (Resolve-Path ".\i18n").Path $rel
  $destDir = Split-Path $dest -Parent
  if(!(Test-Path $destDir)){ New-Item -ItemType Directory -Force $destDir | Out-Null }
  Copy-Item -Force $j.FullName $dest
  $copied++
}
Write-Host "JSON copied: $copied"
