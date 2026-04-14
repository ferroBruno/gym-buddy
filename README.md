# Gym Buddy v1

Initial backend execution slice for Gym Buddy v1.

## Scope in this slice

- boot a local Fastify backend
- expose `GET /health`
- expose `POST /session/start`
- establish a current-session-only foundation
- return the Gym Buddy opening message with free-scope boundaries
- start the guided session with a first follow-up prompt

## Install

```bash
npm install
```

## Run locally

```bash
cp .env.example .env
npm run dev
```

The server starts on `http://localhost:3000` by default.

## Test locally

```bash
npm test
```

## Example requests

Healthcheck:

```bash
curl http://localhost:3000/health
```

Start a session:

```bash
curl -X POST http://localhost:3000/session/start ^
  -H "content-type: application/json" ^
  -d "{\"channelUserId\":\"whatsapp:+5511999999999\"}"
```

## Notes

- `SESSION_STORE_MODE=memory` is the default for this slice so it can run locally without infrastructure.
- Redis config is already wired for the active-session boundary, but the Redis-backed path is not yet covered by automated local tests.
- Supabase env vars are documented now for the persistent operational boundary, but no operational persistence is implemented in this slice.
