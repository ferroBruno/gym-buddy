# AGENTS.md

## Dev environment tips
- Use `docker compose up -d` to run the local n8n + Postgres stack.
- Use `docker compose config --quiet` to validate Compose syntax after infrastructure changes.
- Store generated planning or workflow artefacts in `.context/` so reruns stay deterministic.
- Do not reintroduce the removed Fastify, WhatsApp, Redis, or Node build stack unless explicitly requested.
- Copy `.env.example` to `.env` before running the stack, then set local secrets there.

## Local automation skills
- Check `.context/docs/automation-skill-catalog.md` before starting recurring workflow, knowledge, smoke-test, documentation, or operations tasks.
- Use the matching local skill in `.context/skills/<skill-name>/SKILL.md` when the task fits one of the cataloged responsibilities.
- Use `.context/scripts/` validation scripts referenced by those skills before considering related work complete.
- Treat these repo-local skills as controlled project process. Do not replace them with external or global skills unless explicitly requested.

## Testing instructions
- Execute `docker compose config --quiet` for structural validation.
- For local smoke validation, run `docker compose up -d` and confirm n8n responds on `http://localhost:5678`.
- Validate Telegram workflows manually inside n8n until workflow exports or automated checks exist.

## PR instructions
- Follow Conventional Commits (for example, `feat(scaffolding): add doc links`).
- Cross-link new docs in `.context/docs/README.md` so future agents can find them.
- Attach sample n8n workflow output or generated markdown when behaviour shifts.
- Confirm Docker Compose validation passes before opening a PR.

## Repository map
- `.context/`: project context, planning notes, generated prompts, and workflow documentation.
- `.context/docs/`: human-readable documentation index and product/technical references.
- `.context/workflows/`: exported n8n workflows, workflow drafts, and test payloads.
- `.context/prompts/`: agent prompts, guardrails, playbooks, and evaluation prompts.
- `docker-compose.yml`: local infrastructure for n8n and Postgres.
- `.env.example`: documented environment variables for local setup.
- `.env`: local secrets and environment values. Never commit this file.

## Security instructions
- Do not commit real API keys, Telegram tokens, OpenAI keys, Google credentials, OAuth secrets, private URLs, or production secrets.
- Keep `N8N_ENCRYPTION_KEY` stable after credentials are created, because n8n uses it to encrypt stored credentials.
- Prefer storing integration secrets as n8n credentials instead of hardcoding them in workflows or documentation.

## Local setup
1. Copy `.env.example` to `.env`.
2. Replace `POSTGRES_PASSWORD`.
3. Generate a stable `N8N_ENCRYPTION_KEY` with at least 32 characters.
4. Run `docker compose config --quiet`.
5. Run `docker compose up -d`.
6. Validate n8n at `http://localhost:5678`.

## Telegram/webhook note
- Telegram webhooks require a public HTTPS URL.
- `WEBHOOK_URL=http://localhost:5678/` is enough for local UI testing, but not enough for Telegram webhook delivery.
- For Telegram testing, use a temporary tunnel such as ngrok or cloudflared and update `WEBHOOK_URL` and `N8N_EDITOR_BASE_URL` in `.env`.

## AI Context References
- Documentation index: `.context/docs/README.md`
