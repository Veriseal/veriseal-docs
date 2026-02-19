# ============================================================
# VeriSeal Docs - Full Audit Script (Docusaurus) - PS 5.1 SAFE
# - Build checks (all locales)
# - Broken links / markdown links (via build)
# - Sidebar/doc refs existence
# - Frontmatter id duplicates
# - Non-ASCII scan (encoding risk)
# - Missing images referenced in MD/MDX
# - Report output
# ============================================================

param(
  [string]$Root = ".",
  [string]$ReportDir = ".\audit-report",
  [switch]$NoInstall
)

$ErrorActionPreference = "Stop"

function Write-Section($title) {
  Write-Host ""
  Write-Host "============================================================"
  Write-Host $title
  Write-Host "============================================================"
}

function Ensure-Dir($p) {
  if (!(Test-Path $p)) { New-Item -ItemType Directory -Path $p | Out-Null }
}

function Run-Cmd($cmd, $logFile) {
  Write-Host ">> $cmd"
  cmd.exe /c "$cmd" 1> $logFile 2>&1
  $code = $LASTEXITCODE
  if ($code -ne 0) {
    Write-Host "!! FAILED (exit $code): $cmd"
    Write-Host "   See log: $logFile"
    throw "Command failed: $cmd"
  }
}

function Get-AllFiles($base, $patterns) {
  $all = @()
  if (!(Test-Path $base)) { return $all }
  foreach ($pat in $patterns) {
    $all += Get-ChildItem -Path $base -Recurse -File -Filter $pat -ErrorAction SilentlyContinue
  }
  return $all
}

# ------------------------------------------------------------
# Setup
# ------------------------------------------------------------
$Root = (Resolve-Path $Root).Path
$ReportDir = Join-Path $Root $ReportDir
Ensure-Dir $ReportDir

$ts = (Get-Date).ToString("yyyyMMdd_HHmmss")
$MainReport = Join-Path $ReportDir ("audit_" + $ts + ".txt")

Write-Section "VeriSeal Docs Audit - START"
("Root: " + $Root) | Out-File -FilePath $MainReport -Encoding ASCII
("Timestamp: " + $ts) | Out-File -FilePath $MainReport -Encoding ASCII -Append

Set-Location $Root

# ------------------------------------------------------------
# Basic sanity
# ------------------------------------------------------------
Write-Section "1) Environment"
$nodeV = (node -v) 2>$null
$npmV  = (npm -v) 2>$null
("node: " + $nodeV) | Out-File $MainReport -Encoding ASCII -Append
("npm : " + $npmV)  | Out-File $MainReport -Encoding ASCII -Append

if (!(Test-Path ".\package.json")) { throw "package.json not found in $Root" }
if (!(Test-Path ".\docusaurus.config.js") -and !(Test-Path ".\docusaurus.config.ts")) {
  throw "docusaurus.config.(js|ts) not found"
}

# ------------------------------------------------------------
# Install deps
# ------------------------------------------------------------
Write-Section "2) Dependencies"
if (-not $NoInstall) {
  $log = Join-Path $ReportDir ("npm_ci_" + $ts + ".log")
  if (Test-Path ".\package-lock.json") {
    Run-Cmd "npm ci" $log
  } else {
    Run-Cmd "npm install" $log
  }
} else {
  "Skipped install (NoInstall switch)" | Out-File $MainReport -Encoding ASCII -Append
}

# ------------------------------------------------------------
# Optional lint/typecheck if present
# ------------------------------------------------------------
Write-Section "3) Optional Lint/Typecheck"
$pkg = Get-Content ".\package.json" -Raw

if ($pkg -match '"lint"\s*:') {
  $log = Join-Path $ReportDir ("npm_lint_" + $ts + ".log")
  Run-Cmd "npm run lint" $log
} else {
  "No lint script found" | Out-File $MainReport -Encoding ASCII -Append
}

if ($pkg -match '"typecheck"\s*:') {
  $log = Join-Path $ReportDir ("npm_typecheck_" + $ts + ".log")
  Run-Cmd "npm run typecheck" $log
} else {
  "No typecheck script found" | Out-File $MainReport -Encoding ASCII -Append
}

# ------------------------------------------------------------
# Find locales from config (best-effort) - PS 5.1 SAFE
# ------------------------------------------------------------
Write-Section "4) Detect locales (best-effort)"
$locales = @("en","fr","ro")

try {

  if (Test-Path ".\docusaurus.config.ts") {
    $cfgPath = ".\docusaurus.config.ts"
  }
  elseif (Test-Path ".\docusaurus.config.js") {
    $cfgPath = ".\docusaurus.config.js"
  }
  else {
    throw "No docusaurus.config.(ts|js) found"
  }

  $cfgText = Get-Content $cfgPath -Raw

  # naive regex for locales: locales: ['fr','en','ro',...]
  $m = [regex]::Match($cfgText, "locales\s*:\s*\[(?<x>[\s\S]*?)\]")
  if ($m.Success) {
    $inside = $m.Groups["x"].Value

    $found = [regex]::Matches($inside, "'([a-z]{2})'")
    $temp = @()
    foreach ($f in $found) {
      $temp += $f.Groups[1].Value
    }

    if ($temp.Count -gt 0) {
      $locales = $temp | Select-Object -Unique
    }
  }

}
catch {
  Write-Host "Locale detection fallback used."
}

("Locales: " + ($locales -join ", ")) | Out-File $MainReport -Encoding ASCII -Append

# ------------------------------------------------------------
# Docusaurus build for each locale
# ------------------------------------------------------------
Write-Section "5) Docusaurus build (per locale)"
foreach ($loc in $locales) {
  $log = Join-Path $ReportDir ("build_" + $loc + "_" + $ts + ".log")
  Run-Cmd ("npm run build -- --locale " + $loc) $log
  ("Build OK: " + $loc) | Out-File $MainReport -Encoding ASCII -Append
}

# ------------------------------------------------------------
# MD/MDX integrity checks (frontmatter id duplicates)
# ------------------------------------------------------------
Write-Section "6) Frontmatter id duplicates (docs + pages)"
$docsDir = Join-Path $Root "docs"
$pagesDir = Join-Path $Root "src\pages"

$mdFiles = Get-AllFiles $docsDir @("*.md","*.mdx")
$pgFiles = Get-AllFiles $pagesDir @("*.md","*.mdx")

$allMd = @()
$allMd += $mdFiles
$allMd += $pgFiles

$idMap = @{}
$dups = New-Object System.Collections.Generic.List[string]

foreach ($f in $allMd) {
  $txt = Get-Content $f.FullName -Raw

  # frontmatter block --- ... ---
  if ($txt -match "(?s)^---\s*(?<fm>.*?)\s*---") {
    $fm = $Matches["fm"]
    $idm = [regex]::Match($fm, "^\s*id\s*:\s*(?<id>[A-Za-z0-9\-_\/]+)\s*$", "Multiline")
    if ($idm.Success) {
      $id = $idm.Groups["id"].Value.Trim()
      if ($idMap.ContainsKey($id)) {
        $dups.Add("DUP id='$id' in: $($idMap[$id]) AND $($f.FullName)")
      } else {
        $idMap[$id] = $f.FullName
      }
    }
  }
}

if ($dups.Count -gt 0) {
  $dupFile = Join-Path $ReportDir ("dup_ids_" + $ts + ".txt")
  $dups | Out-File $dupFile -Encoding ASCII
  throw "Duplicate frontmatter ids found. See: $dupFile"
} else {
  "No duplicate frontmatter ids found" | Out-File $MainReport -Encoding ASCII -Append
}

# ------------------------------------------------------------
# Sidebar refs existence (docs paths)
# ------------------------------------------------------------
Write-Section "7) Sidebar references check"
$sidebarPath = ".\sidebars.js"
if (!(Test-Path $sidebarPath)) {
  "sidebars.js not found - skipped" | Out-File $MainReport -Encoding ASCII -Append
} else {

  # Build set of doc path-ids from docs folder
  $docSet = New-Object System.Collections.Generic.HashSet[string]
  foreach ($f in $mdFiles) {
    $rel = $f.FullName.Substring($docsDir.Length).TrimStart("\","/")
    $rel = $rel -replace "\\","/"
    $rel = $rel -replace "\.(md|mdx)$",""
    [void]$docSet.Add($rel)
  }

  $sb = Get-Content $sidebarPath -Raw

  # Extract strings that look like doc ids: 'whitepaper/proof-crisis'
  $docIdsMatches = [regex]::Matches($sb, "'([A-Za-z0-9\-_\/]+)'")
  $docIds = @()
  foreach ($m in $docIdsMatches) { $docIds += $m.Groups[1].Value }
  $docIds = $docIds | Select-Object -Unique

  $missing = New-Object System.Collections.Generic.List[string]
  foreach ($id in $docIds) {
    if ($id -match "^(type|label|collapsed|items)$") { continue }
    if ($id -match "/") {
      if (-not $docSet.Contains($id)) {
        $missing.Add("Missing doc path id in sidebars.js: '$id'")
      }
    }
  }

  if ($missing.Count -gt 0) {
    $missFile = Join-Path $ReportDir ("sidebar_missing_" + $ts + ".txt")
    $missing | Out-File $missFile -Encoding ASCII
    throw "Sidebar references missing docs. See: $missFile"
  } else {
    "Sidebar path references OK" | Out-File $MainReport -Encoding ASCII -Append
  }
}

# ------------------------------------------------------------
# Missing images referenced in MD/MDX
# ------------------------------------------------------------
Write-Section "8) Missing images referenced in MD/MDX"
$missingImgs = New-Object System.Collections.Generic.List[string]

foreach ($f in $allMd) {
  $txt = Get-Content $f.FullName -Raw

  # Markdown images ![alt](path)
  $matches = [regex]::Matches($txt, "!\[[^\]]*\]\((?<p>[^)]+)\)")
  foreach ($m in $matches) {
    $p = $m.Groups["p"].Value.Trim()

    # skip http(s) and data:
    if ($p -match "^(http|https|data):") { continue }

    # drop fragment/query
    $p2 = $p.Split("?")[0].Split("#")[0]

    $candidate = $null
    if ($p2.StartsWith("/")) {
      # site-root: usually maps to /static
      $candidate = Join-Path $Root ("static" + $p2.Replace("/","\"))
    } else {
      $candidate = Join-Path $f.DirectoryName $p2
    }

    if ($candidate -and !(Test-Path $candidate)) {
      $missingImgs.Add("Missing image: $p2 referenced in $($f.FullName)")
    }
  }
}

if ($missingImgs.Count -gt 0) {
  $imgFile = Join-Path $ReportDir ("missing_images_" + $ts + ".txt")
  $missingImgs | Out-File $imgFile -Encoding ASCII
  throw "Missing images referenced in MD/MDX. See: $imgFile"
} else {
  "No missing images referenced in MD/MDX" | Out-File $MainReport -Encoding ASCII -Append
}

# ------------------------------------------------------------
# Non-ASCII scan (encoding risk)
# ------------------------------------------------------------
Write-Section "9) Non-ASCII scan (encoding risk)"
$codeFiles = Get-AllFiles $Root @("*.md","*.mdx","*.js","*.jsx","*.ts","*.tsx","*.css","*.json")
$codeFiles = $codeFiles | Where-Object {
  $_.FullName -notmatch "\\node_modules\\" -and
  $_.FullName -notmatch "\\build\\" -and
  $_.FullName -notmatch "\\\.docusaurus\\"
}

$nonAscii = New-Object System.Collections.Generic.List[string]
foreach ($f in $codeFiles) {
  $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
  foreach ($b in $bytes) {
    if ($b -ge 128) {
      $nonAscii.Add("Non-ASCII byte detected in: $($f.FullName)")
      break
    }
  }
}

if ($nonAscii.Count -gt 0) {
  $naFile = Join-Path $ReportDir ("non_ascii_" + $ts + ".txt")
  $nonAscii | Out-File $naFile -Encoding ASCII
  "WARNING: Non-ASCII detected. See: $naFile" | Out-File $MainReport -Encoding ASCII -Append
} else {
  "No non-ASCII bytes detected (ASCII-safe)" | Out-File $MainReport -Encoding ASCII -Append
}

# ------------------------------------------------------------
# Done
# ------------------------------------------------------------
Write-Section "AUDIT SUCCESS"
"SUCCESS: All checks passed." | Out-File $MainReport -Encoding ASCII -Append
Write-Host ""
Write-Host "OK - Audit completed."
Write-Host "Report: $MainReport"
exit 0
