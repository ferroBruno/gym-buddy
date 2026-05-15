---
name: ops-stabilizer
description: Validate Gym Buddy runtime configuration, required environment variables, n8n local settings, tunnel readiness, and operational Docker Compose assumptions. Use when changing `.env.example`, diagnosing local runtime setup, preparing Telegram webhook tests, or checking n8n/cloudflared/Ollama environment readiness.
---

# Ops Stabilizer

## Workflow

1. Read `.context/docs/local-setup.md`, `.context/docs/mvp-technical-validation.md`, and `.context/docs/telegram-testing-plan.md` when Telegram runtime is involved.
2. Validate required environment variables without printing secret values:

```powershell
.\.context\scripts\Test-RuntimeEnv.ps1
```

3. Use `-RequireTunnel` only for Telegram public webhook readiness.
4. Run Docker Compose validation after infrastructure changes:

```powershell
docker compose config --quiet
```

## Boundaries

Do not commit `.env`. Do not rotate `N8N_ENCRYPTION_KEY` after credentials exist. Do not delete Docker volumes unless the user explicitly approves losing local n8n/Postgres data.
