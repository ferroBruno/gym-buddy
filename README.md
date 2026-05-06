# Gym Buddy v1

Lightweight session onboarding slice for Gym Buddy v1.

## Scope in this slice

- boot a local Fastify backend
- expose `GET /health`
- expose `POST /session/start`
- expose `POST /session/message`
- establish a current-session-only foundation
- return the Gym Buddy opening message with free-scope boundaries
- collect the current session goal and available time
- generate the first guided workout step
- support one minimal continuation step based only on current-session context

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
npm run lint
npm test
```

## Build

```bash
npm run build
```

## Example requests

Healthcheck:

```bash
curl http://localhost:3000/health
```

WhatsApp webhook verification:

```bash
curl "http://localhost:3000/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=change-me&hub.challenge=ok"
```

Start a session:

```bash
curl -X POST http://localhost:3000/session/start ^
  -H "content-type: application/json" ^
  -H "authorization: Bearer change-me" ^
  -d "{\"channelUserId\":\"whatsapp:+5511999999999\"}"
```

Continue the session:

```bash
curl -X POST http://localhost:3000/session/message ^
  -H "content-type: application/json" ^
  -H "authorization: Bearer change-me" ^
  -d "{\"sessionId\":\"<session-id>\",\"message\":\"quick full-body session\"}"
```

```bash
curl -X POST http://localhost:3000/session/message ^
  -H "content-type: application/json" ^
  -H "authorization: Bearer change-me" ^
  -d "{\"sessionId\":\"<session-id>\",\"message\":\"12 minutes\"}"
```

```bash
curl -X POST http://localhost:3000/session/message ^
  -H "content-type: application/json" ^
  -H "authorization: Bearer change-me" ^
  -d "{\"sessionId\":\"<session-id>\",\"message\":\"done\"}"
```

## Notes

- `SESSION_STORE_MODE=memory` is the default for this slice so it can run locally without infrastructure.
- `SESSION_STORE_MODE=redis` and `REDIS_URL=rediss://...` are required in production.
- `POST /webhooks/whatsapp` requires a valid Meta `X-Hub-Signature-256` signature.
- `POST /session/start` and `POST /session/message` require `INTERNAL_API_TOKEN`.
- The session keeps only lightweight context for the active workout: broad goal and available time.
- Redis config is already wired for the active-session boundary, but the Redis-backed path is not yet covered by automated local tests.
- Active session keys in Redis use `gym-buddy:session:{sessionId}` and must only hold current-session state with TTL.
- Supabase env vars are documented now for the persistent operational boundary, but no operational persistence is implemented in this slice.
