param(
  [string]$Root = "."
)

$ErrorActionPreference = "Stop"
$failures = New-Object System.Collections.Generic.List[string]

function Add-Failure([string]$Message) {
  $failures.Add($Message) | Out-Null
}

$markdownFiles = Get-ChildItem -LiteralPath $Root -Recurse -File |
  Where-Object { $_.Extension -eq ".md" -and $_.FullName -notmatch "\\.git\\" }

$linkPattern = "\[[^\]]+\]\(([^)]+)\)"

foreach ($file in $markdownFiles) {
  $content = Get-Content -Raw -LiteralPath $file.FullName
  $matches = [regex]::Matches($content, $linkPattern)

  foreach ($match in $matches) {
    $target = $match.Groups[1].Value.Trim()
    if (-not $target) { continue }
    if ($target -match "^(https?://|mailto:|#)") { continue }
    if ($target.StartsWith("<") -and $target.EndsWith(">")) {
      $target = $target.Substring(1, $target.Length - 2)
    }
    if ($target -match "^[a-zA-Z]+:") { continue }

    $targetPath = ($target -split "#")[0]
    if (-not $targetPath) { continue }

    try {
      $combined = Join-Path -Path $file.DirectoryName -ChildPath $targetPath
      if (-not (Test-Path -LiteralPath $combined)) {
        Add-Failure "$($file.FullName): missing link target '$target'"
      }
    } catch {
      Add-Failure "$($file.FullName): invalid link target '$target'"
    }
  }
}

if ($failures.Count -gt 0) {
  Write-Host "Documentation link validation failed:" -ForegroundColor Red
  foreach ($failure in $failures) {
    Write-Host " - $failure" -ForegroundColor Red
  }
  exit 1
}

Write-Host "Documentation link validation passed" -ForegroundColor Green
exit 0
