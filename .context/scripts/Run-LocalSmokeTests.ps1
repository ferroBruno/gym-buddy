param(
  [string]$BaseUrl = "http://localhost:5678",
  [switch]$StartStack,
  [switch]$TestWebhooks
)

$ErrorActionPreference = "Stop"
$failures = New-Object System.Collections.Generic.List[string]

function Add-Failure([string]$Message) {
  $failures.Add($Message) | Out-Null
}

try {
  docker compose config --quiet
  Write-Host "Docker Compose config passed" -ForegroundColor Green
} catch {
  Add-Failure "docker compose config --quiet failed: $($_.Exception.Message)"
}

if ($StartStack) {
  try {
    docker compose up -d
    Write-Host "Docker Compose stack started" -ForegroundColor Green
  } catch {
    Add-Failure "docker compose up -d failed: $($_.Exception.Message)"
  }
}

try {
  $response = Invoke-WebRequest -Uri $BaseUrl -UseBasicParsing -TimeoutSec 10
  if ($response.StatusCode -lt 200 -or $response.StatusCode -ge 500) {
    Add-Failure "n8n responded with unexpected status $($response.StatusCode)"
  } else {
    Write-Host "n8n responded at $BaseUrl" -ForegroundColor Green
  }
} catch {
  Add-Failure "n8n did not respond at ${BaseUrl}: $($_.Exception.Message)"
}

if ($TestWebhooks) {
  $headers = @{ "Content-Type" = "application/json" }

  try {
    $payload = @{ text = "ola gym buddy" } | ConvertTo-Json -Compress
    $result = Invoke-RestMethod -Method Post -Uri "$BaseUrl/webhook/gym-buddy-smoke" -Headers $headers -Body $payload -TimeoutSec 15
    if ($result.ok -ne $true -or $result.service -ne "gym-buddy") {
      Add-Failure "local webhook smoke returned an unexpected payload"
    } else {
      Write-Host "local webhook smoke passed" -ForegroundColor Green
    }
  } catch {
    Add-Failure "local webhook smoke failed. Confirm workflow 000 is imported and active: $($_.Exception.Message)"
  }

  try {
    $payload = @{
      channel = "local-smoke"
      chatId = "local-test"
      messageText = "posso trocar agachamento por leg press?"
      messageType = "text"
    } | ConvertTo-Json -Compress
    $result = Invoke-RestMethod -Method Post -Uri "$BaseUrl/webhook/gym-buddy-core-smoke" -Headers $headers -Body $payload -TimeoutSec 15
    if (-not $result.replyText -or -not $result.intent) {
      Add-Failure "core smoke returned an unexpected payload"
    } else {
      Write-Host "core smoke passed with intent '$($result.intent)'" -ForegroundColor Green
    }
  } catch {
    Add-Failure "core smoke failed. Confirm workflow 020 is imported and active: $($_.Exception.Message)"
  }
}

if ($failures.Count -gt 0) {
  Write-Host "Local smoke validation failed:" -ForegroundColor Red
  foreach ($failure in $failures) {
    Write-Host " - $failure" -ForegroundColor Red
  }
  exit 1
}

Write-Host "Local smoke validation passed" -ForegroundColor Green
exit 0
