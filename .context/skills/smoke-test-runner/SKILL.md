---
name: smoke-test-runner
description: Run Gym Buddy local smoke validation for Docker Compose, n8n reachability, and smoke workflow endpoints. Use when validating local setup, checking `docker compose config --quiet`, confirming n8n responds, or testing imported active webhook workflows without Telegram credentials.
---

# Smoke Test Runner

## Workflow

1. Read `.context/docs/local-setup.md`, `.context/docs/smoke-test-workflow.md`, and `.context/docs/core-smoke-workflow.md`.
2. Validate Docker Compose first.
3. Start the stack only when the user wants executable local validation.
4. Test n8n reachability.
5. Test smoke webhook endpoints only when the workflows are imported and active in n8n.

## Command

```powershell
.\.context\scripts\Run-LocalSmokeTests.ps1
```

Use `-StartStack` to run `docker compose up -d`. Use `-TestWebhooks` only after importing and activating the smoke workflows.

## Boundaries

Do not treat these checks as Telegram validation. Telegram requires credential setup, active Telegram workflow, and a public HTTPS webhook URL.
