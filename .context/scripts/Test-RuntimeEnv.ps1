param(
  [string]$EnvExamplePath = ".env.example",
  [string]$EnvPath = ".env",
  [switch]$RequireTunnel
)

$ErrorActionPreference = "Stop"
$failures = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]

function Add-Failure([string]$Message) {
  $failures.Add($Message) | Out-Null
}

function Add-Warning([string]$Message) {
  $warnings.Add($Message) | Out-Null
}

function Read-EnvFile([string]$Path) {
  $values = @{}
  if (-not (Test-Path -LiteralPath $Path)) {
    return $values
  }

  foreach ($line in Get-Content -LiteralPath $Path) {
    $trimmed = $line.Trim()
    if (-not $trimmed -or $trimmed.StartsWith("#")) { continue }
    $index = $trimmed.IndexOf("=")
    if ($index -le 0) { continue }
    $key = $trimmed.Substring(0, $index).Trim()
    $value = $trimmed.Substring($index + 1).Trim()
    $values[$key] = $value
  }
  return $values
}

$required = @(
  "N8N_VERSION",
  "N8N_PORT",
  "N8N_HOST",
  "N8N_PROTOCOL",
  "N8N_EDITOR_BASE_URL",
  "WEBHOOK_URL",
  "GENERIC_TIMEZONE",
  "N8N_SECURE_COOKIE",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
  "N8N_ENCRYPTION_KEY"
)

if (-not (Test-Path -LiteralPath $EnvExamplePath)) {
  Add-Failure "missing $EnvExamplePath"
} else {
  $example = Read-EnvFile $EnvExamplePath
  foreach ($key in $required) {
    if (-not $example.ContainsKey($key)) {
      Add-Failure "$EnvExamplePath is missing $key"
    }
  }
}

if (-not (Test-Path -LiteralPath $EnvPath)) {
  Add-Warning "$EnvPath does not exist; copy .env.example before running the stack"
} else {
  $envValues = Read-EnvFile $EnvPath
  foreach ($key in $required) {
    if (-not $envValues.ContainsKey($key) -or [string]::IsNullOrWhiteSpace($envValues[$key])) {
      Add-Failure "$EnvPath is missing a value for $key"
    }
  }

  if ($envValues.ContainsKey("POSTGRES_PASSWORD") -and $envValues["POSTGRES_PASSWORD"] -eq "change-this-local-password") {
    Add-Failure "$EnvPath still uses the placeholder POSTGRES_PASSWORD"
  }

  if ($envValues.ContainsKey("N8N_ENCRYPTION_KEY")) {
    $keyValue = $envValues["N8N_ENCRYPTION_KEY"]
    if ($keyValue.Length -lt 32 -or $keyValue -eq "generate-a-random-32-plus-character-key") {
      Add-Failure "$EnvPath N8N_ENCRYPTION_KEY must be stable and at least 32 characters"
    }
  }

  if ($RequireTunnel) {
    foreach ($key in @("WEBHOOK_URL", "N8N_EDITOR_BASE_URL")) {
      if (-not $envValues.ContainsKey($key) -or $envValues[$key] -notmatch "^https://") {
        Add-Failure "$key must be an https public URL for Telegram webhook testing"
      }
      if ($envValues.ContainsKey($key) -and $envValues[$key] -match "localhost|127\.0\.0\.1") {
        Add-Failure "$key cannot point to localhost when -RequireTunnel is used"
      }
    }
  }
}

if (-not (Test-Path -LiteralPath "docker-compose.yml")) {
  Add-Failure "missing docker-compose.yml"
}

foreach ($warning in $warnings) {
  Write-Warning $warning
}

if ($failures.Count -gt 0) {
  Write-Host "Runtime environment validation failed:" -ForegroundColor Red
  foreach ($failure in $failures) {
    Write-Host " - $failure" -ForegroundColor Red
  }
  exit 1
}

Write-Host "Runtime environment validation passed" -ForegroundColor Green
exit 0
