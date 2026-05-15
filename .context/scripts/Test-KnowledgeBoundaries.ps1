param(
  [string]$ContextDir = ".context"
)

$ErrorActionPreference = "Stop"
$failures = New-Object System.Collections.Generic.List[string]

function Add-Failure([string]$Message) {
  $failures.Add($Message) | Out-Null
}

$requiredPaths = @(
  "$ContextDir/docs/knowledge-architecture.md",
  "$ContextDir/docs/knowledge-conversion-map.md",
  "$ContextDir/knowledge/README.md",
  "$ContextDir/knowledge/inventory",
  "$ContextDir/knowledge/audits",
  "$ContextDir/knowledge/curated",
  "$ContextDir/prompts/guardrails",
  "$ContextDir/prompts/playbooks",
  "$ContextDir/prompts/response-generation"
)

foreach ($path in $requiredPaths) {
  if (-not (Test-Path -LiteralPath $path)) {
    Add-Failure "missing required knowledge path: $path"
  }
}

$inventoryFiles = @()
if (Test-Path -LiteralPath "$ContextDir/knowledge/inventory") {
  $inventoryFiles = @(Get-ChildItem -LiteralPath "$ContextDir/knowledge/inventory" -File)
}
if ($inventoryFiles.Count -eq 0) {
  Add-Failure "knowledge inventory has no files"
}

$auditFiles = @()
if (Test-Path -LiteralPath "$ContextDir/knowledge/audits") {
  $auditFiles = @(Get-ChildItem -LiteralPath "$ContextDir/knowledge/audits" -File)
}
if ($auditFiles.Count -eq 0) {
  Add-Failure "knowledge audits has no files"
}

$runtimeDirs = @("$ContextDir/prompts", "$ContextDir/workflows")
foreach ($dir in $runtimeDirs) {
  if (-not (Test-Path -LiteralPath $dir)) { continue }
  $matches = Get-ChildItem -LiteralPath $dir -Recurse -File |
    Select-String -Pattern "raw-sample|knowledge/raw|knowledge\\raw|Raw Knowledge directly|Raw Knowledge diretamente" -CaseSensitive:$false
  foreach ($match in $matches) {
    Add-Failure "runtime-facing file references raw knowledge: $($match.Path):$($match.LineNumber)"
  }
}

if ($failures.Count -gt 0) {
  Write-Host "Knowledge boundary validation failed:" -ForegroundColor Red
  foreach ($failure in $failures) {
    Write-Host " - $failure" -ForegroundColor Red
  }
  exit 1
}

Write-Host "Knowledge boundary validation passed" -ForegroundColor Green
exit 0
