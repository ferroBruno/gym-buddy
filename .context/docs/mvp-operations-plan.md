# MVP Operations Plan

## Goal

Keep the Telegram-first MVP available for longer validation windows and make technical validation visible outside the terminal.

## Current Limitation

Cloudflare Quick Tunnel URLs are temporary. They can reconnect, rotate, or stop accepting traffic. This is useful for a short smoke test, but it is not acceptable for a bot that should stay available 24/7.

For 24/7 local operation, the minimum viable setup is:

- local machine powered on;
- Docker Desktop running;
- `postgres`, `n8n`, `ollama`, and `cloudflared` containers running with `restart: unless-stopped`;
- stable public HTTPS hostname;
- Telegram webhook registered to that stable hostname.

## Recommended No-Budget Path

Use a Cloudflare Named Tunnel instead of a Quick Tunnel.

This keeps the public hostname stable and avoids changing `WEBHOOK_URL` every time a quick tunnel rotates.

Required local variables:

```env
N8N_HOST=<stable-hostname>
N8N_PROTOCOL=https
N8N_EDITOR_BASE_URL=https://<stable-hostname>
WEBHOOK_URL=https://<stable-hostname>/
CLOUDFLARED_TUNNEL_TOKEN=<cloudflare-named-tunnel-token>
```

Start the stack with:

```powershell
docker compose --profile llm --profile tunnel up -d
```

After changing tunnel or webhook variables, recreate n8n so it registers the Telegram webhook again:

```powershell
docker compose up -d --force-recreate n8n
```

## Runtime Services

Expected containers:

- `postgres`: n8n database and execution persistence.
- `n8n`: workflow runtime and UI.
- `ollama`: local LLM fallback provider.
- `cloudflared`: stable HTTPS tunnel when using the `tunnel` profile.

Validate with:

```powershell
docker compose ps
```

## Observability Without Terminal Logs

The MVP now explicitly configures n8n execution retention:

```env
EXECUTIONS_DATA_SAVE_ON_SUCCESS=all
EXECUTIONS_DATA_SAVE_ON_ERROR=all
EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=true
EXECUTIONS_DATA_PRUNE=true
EXECUTIONS_DATA_MAX_AGE=168
```

Use the n8n UI:

1. Open `N8N_EDITOR_BASE_URL`.
2. Go to `Executions`.
3. Filter workflow `030 - Gym Buddy MVP Telegram`.
4. Open the latest execution.
5. Inspect these nodes:
   - `Route And Build Context`: extracted Telegram fields, intent, route, risk level.
   - `Call Local LLM`: Ollama response or error.
   - `Normalize Local LLM Reply`: final model/fallback decision.
   - `Log Reply`: structured technical log object.
   - `Send Reply`: Telegram delivery result.

This is the primary early-stage debugging surface. Terminal logs remain useful only as a secondary check.

## What The Execution Should Prove

For each Telegram message, confirm:

- the execution was created;
- `chat_id` was extracted;
- intent classification matches the user message;
- `requires_llm` is correct;
- local LLM was called only when expected;
- fallback was used only when expected;
- Telegram send node succeeded.

## Known Non-Goals For This Step

Do not add:

- RAG;
- embeddings;
- Google Drive runtime;
- a new backend;
- WhatsApp;
- image interpretation;
- memory across sessions.

## Next Hardening Step

After the MVP behavior is validated, add a dedicated conversation log table or external dashboard only if n8n execution history becomes insufficient for reviewing user interactions.
