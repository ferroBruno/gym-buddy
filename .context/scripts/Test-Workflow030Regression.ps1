param(
  [switch]$CheckActiveN8n
)

$ErrorActionPreference = "Stop"
$failures = New-Object System.Collections.Generic.List[string]

function Add-Failure([string]$Message) {
  $failures.Add($Message) | Out-Null
}

function Get-Workflow030NodesFromExport {
  $path = ".context/workflows/030-gym-buddy-mvp-telegram.json"
  if (-not (Test-Path -LiteralPath $path)) {
    Add-Failure "workflow export not found: $path"
    return $null
  }
  return (Get-Content -Raw -LiteralPath $path | ConvertFrom-Json).nodes
}

function Test-Workflow030Nodes($nodes, [string]$Source) {
  if (-not $nodes) {
    Add-Failure "${Source}: missing workflow nodes"
    return
  }

  $route = @($nodes | Where-Object { $_.name -eq "Route And Build Context" })[0]
  $log = @($nodes | Where-Object { $_.name -eq "Log Reply" })[0]
  $send = @($nodes | Where-Object { $_.name -eq "Send Reply" })[0]

  if (-not $route) { Add-Failure "${Source}: missing Route And Build Context node"; return }
  if (-not $log) { Add-Failure "${Source}: missing Log Reply node" }
  if (-not $send) { Add-Failure "${Source}: missing Send Reply node" }

  $routeCode = [string]$route.parameters.jsCode
  $logCode = [string]$log.parameters.jsCode

  if ($routeCode -notmatch "function classifyWithLlm") {
    Add-Failure "${Source}: missing restricted LLM classifier"
  }

  if ($routeCode -notmatch "format: 'json'") {
    Add-Failure "${Source}: classifier must request JSON output"
  }

  if ($routeCode -notmatch "macro_intent") {
    Add-Failure "${Source}: route output must include macro_intent"
  }

  if ($logCode -notmatch "macro_intent") {
    Add-Failure "${Source}: technical log must include macro_intent"
  }

  if ($logCode -notmatch "classifier_status") {
    Add-Failure "${Source}: technical log must include classifier_status"
  }

  if ($routeCode -match "/start, treino de 30 min") {
    Add-Failure "${Source}: old fallback text with /start returned"
  }

  if ($routeCode -match "hasAny\(\['dor', 'doendo', 'machuquei', 'lesao', 'fisgada', 'formigamento', 'ombro', 'joelho', 'lombar', 'peito', 'tontura'\]\)") {
    Add-Failure "${Source}: old body-part-only risk trigger returned"
  }

  if ($routeCode -notmatch "function hasRiskSignal") {
    Add-Failure "${Source}: missing explicit risk signal helper"
  }

  if ($routeCode -notmatch "puxada") {
    Add-Failure "${Source}: training vocabulary must include puxada"
  }

  if ($send) {
    $appendAttribution = $send.parameters.additionalFields.appendAttribution
    if ($appendAttribution -ne $false) {
      Add-Failure "${Source}: Send Reply must set additionalFields.appendAttribution to false"
    }
  }
}

$exportNodes = Get-Workflow030NodesFromExport
Test-Workflow030Nodes $exportNodes "export"

if ($CheckActiveN8n) {
  $query = 'select h.nodes from workflow_history h join workflow_entity e on h.\"versionId\" = e.\"activeVersionId\" where e.id = ''030-gym-buddy-mvp-telegram'';'
  $nodesJson = docker compose exec -T postgres psql -U n8n -d n8n -t -A -c $query
  if (-not $nodesJson) {
    Add-Failure "active-n8n: could not read active workflow nodes"
  } else {
    $activeNodes = $nodesJson | ConvertFrom-Json
    Test-Workflow030Nodes $activeNodes "active-n8n"
  }
}

if ($failures.Count -gt 0) {
  Write-Host "Workflow 030 regression validation failed:" -ForegroundColor Red
  foreach ($failure in $failures) {
    Write-Host " - $failure" -ForegroundColor Red
  }
  exit 1
}

Write-Host "Workflow 030 regression validation passed" -ForegroundColor Green
exit 0
