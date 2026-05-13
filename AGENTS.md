# AGENTS.md

## Dev environment tips
- Use `docker compose up -d` to run the local n8n + Postgres stack.
- Use `docker compose config --quiet` to validate Compose syntax after infrastructure changes.
- Store generated planning or workflow artefacts in `.context/` so reruns stay deterministic.
- Do not reintroduce the removed Fastify, WhatsApp, Redis, or Node build stack unless explicitly requested.

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
- Document the major directories so agents know where to work.

## AI Context References
- Documentation index: `.context/docs/README.md`
