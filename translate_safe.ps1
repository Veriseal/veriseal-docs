# ===============================================
# SAFE TRANSLATION SCRIPT – VERISEAL DOCS
# ===============================================

$sourceFile = ".\i18n\en\code.json"
$targetLocales = @("fr","de","it","es","ro","nl")
$backupDir = ".\_backup_translations"

if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir
}

$sourceJson = Get-Content $sourceFile -Raw | ConvertFrom-Json

foreach ($locale in $targetLocales) {

    Write-Host "Processing $locale ..."

    $targetPath = ".\i18n\$locale\code.json"

    if (Test-Path $targetPath) {
        Copy-Item $targetPath "$backupDir\code_$locale_$(Get-Date -Format 'yyyyMMdd_HHmmss').json"
    }

    $newJson = @{}

    foreach ($property in $sourceJson.PSObject.Properties) {

        $key = $property.Name
        $value = $property.Value

        # Traduire uniquement le message
        $translatedMessage = & python translate.py $value.message $locale

        $newJson[$key] = @{
            message = $translatedMessage
            description = $value.description
        }
    }

    $newJson | ConvertTo-Json -Depth 10 | Out-File $targetPath -Encoding utf8
}

Write-Host "Translation complete."