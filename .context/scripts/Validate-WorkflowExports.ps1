param(
  [string]$WorkflowDir = ".context/workflows"
)

$ErrorActionPreference = "Stop"
$failures = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]

function Add-Failure([string]$Path, [string]$Message) {
  $failures.Add("${Path}: ${Message}") | Out-Null
}

function Add-Warning([string]$Path, [string]$Message) {
  $warnings.Add("${Path}: ${Message}") | Out-Null
}

function Has-NodeType($Workflow, [string]$Type) {
  return @($Workflow.nodes | Where-Object { $_.type -eq $Type }).Count -gt 0
}

function Test-CredentialIds($Node, [string]$Path) {
  if (-not $Node.credentials) { return }
  foreach ($credentialType in $Node.credentials.PSObject.Properties) {
    $credential = $credentialType.Value
    if ($credential.PSObject.Properties.Name -contains "id") {
      $id = [string]$credential.id
      if ($id -and $id -notmatch "^(REPLACE_WITH_|PLACEHOLDER|__|TODO)") {
        Add-Failure $Path "node '$($Node.name)' has a non-placeholder credential id"
      }
    }
  }
}

if (-not (Test-Path -LiteralPath $WorkflowDir)) {
  Add-Failure $WorkflowDir "workflow directory does not exist"
}

$secretPatterns = @(
  "bot[0-9]{6,}:[A-Za-z0-9_-]{20,}",
  "sk-[A-Za-z0-9_-]{20,}",
  "xox[baprs]-[A-Za-z0-9-]{10,}",
  "AIza[0-9A-Za-z_-]{20,}",
  "ya29\.[0-9A-Za-z_-]+"
)

$temporaryTunnelPattern = "(trycloudflare\.com|ngrok-free\.app|ngrok\.io)"

$requiredTypesByFile = @{
  "000-smoke-test-local-webhook.json" = @("n8n-nodes-base.webhook", "n8n-nodes-base.code")
  "010-telegram-echo-smoke.json" = @("n8n-nodes-base.telegramTrigger", "n8n-nodes-base.code", "n8n-nodes-base.telegram")
  "020-gym-buddy-core-smoke.json" = @("n8n-nodes-base.webhook", "n8n-nodes-base.code")
  "030-gym-buddy-mvp-telegram.json" = @("n8n-nodes-base.telegramTrigger", "n8n-nodes-base.code", "n8n-nodes-base.telegram")
}

if (Test-Path -LiteralPath $WorkflowDir) {
  $files = Get-ChildItem -LiteralPath $WorkflowDir -Filter "*.json" -File
  if (@($files).Count -eq 0) {
    Add-Failure $WorkflowDir "no workflow JSON files found"
  }

  foreach ($file in $files) {
    $relativePath = $file.FullName
    $raw = Get-Content -Raw -LiteralPath $file.FullName

    if ($file.Name -notmatch "^[0-9]{3}-[a-z0-9]+(-[a-z0-9]+)*\.json$") {
      Add-Failure $relativePath "filename must use numeric prefix and kebab-case"
    }

    foreach ($pattern in $secretPatterns) {
      if ($raw -match $pattern) {
        Add-Failure $relativePath "possible secret detected by pattern '$pattern'"
      }
    }

    if ($raw -match $temporaryTunnelPattern) {
      Add-Failure $relativePath "temporary tunnel URL must not be versioned"
    }

    try {
      $workflow = $raw | ConvertFrom-Json
    } catch {
      Add-Failure $relativePath "invalid JSON: $($_.Exception.Message)"
      continue
    }

    foreach ($property in @("name", "nodes", "connections")) {
      if ($workflow.PSObject.Properties.Name -notcontains $property) {
        Add-Failure $relativePath "missing root property '$property'"
      }
    }

    $nodes = @($workflow.nodes)
    if ($nodes.Count -eq 0) {
      Add-Failure $relativePath "workflow must contain at least one node"
    }

    foreach ($node in $nodes) {
      foreach ($property in @("id", "name", "type", "typeVersion", "position")) {
        if ($node.PSObject.Properties.Name -notcontains $property) {
          Add-Failure $relativePath "node missing property '$property'"
        }
      }
      Test-CredentialIds $node $relativePath
    }

    if ($requiredTypesByFile.ContainsKey($file.Name)) {
      foreach ($requiredType in $requiredTypesByFile[$file.Name]) {
        if (-not (Has-NodeType $workflow $requiredType)) {
          Add-Failure $relativePath "missing required node type '$requiredType'"
        }
      }
    } else {
      Add-Warning $relativePath "no required-node profile defined for this workflow"
    }
  }
}

foreach ($warning in $warnings) {
  Write-Warning $warning
}

if ($failures.Count -gt 0) {
  Write-Host "Workflow export validation failed:" -ForegroundColor Red
  foreach ($failure in $failures) {
    Write-Host " - $failure" -ForegroundColor Red
  }
  exit 1
}

Write-Host "Workflow export validation passed for $WorkflowDir" -ForegroundColor Green
exit 0
