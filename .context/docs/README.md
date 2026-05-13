# Gym Buddy Context Docs

This folder stores human-readable project documentation for the Gym Buddy prototype.

## Current focus

The current technical focus is a local n8n + Postgres stack for validating Telegram-based workflow automation.

## Important files

- `../../AGENTS.md`: instructions for AI agents working in this repository.
- `../../docker-compose.yml`: local n8n + Postgres infrastructure.
- `../../.env.example`: local environment variable template.

## Existing documentation

- `project-overview.md`: concise product source of truth for the current prototype.
- `knowledge-architecture.md`: layered knowledge model for the Gym Buddy agent core.
- `knowledge-base-audit-process.md`: manual audit process for raw knowledge-base material before curated conversion.
- `knowledge-base-audit-template.md`: fillable template for future knowledge-base audit batches.
- `knowledge-conversion-map.md`: mapping from raw materials to reviewed operational knowledge layers.
- `knowledge-inventory-schema.md`: schema for manually inventorying knowledge-base files.
- `core-agent-plan.md`: implementation plan and contracts for the first agent core.
- `core-smoke-workflow.md`: local validation guide for the first rule-based core workflow.
- `local-setup.md`: local Docker Compose setup and first-run notes.
- `workflow-export-conventions.md`: conventions for versioning n8n workflow exports.
- `smoke-test-workflow.md`: import and validation guide for the local smoke test workflow.
- `telegram-testing-plan.md`: practical plan for testing Telegram from a phone through the bot.
- `security.md`: current security and secrets baseline.
- `glossary.md`: stable domain vocabulary and boundary terms.

## Removed or Consolidated

The documentation set was intentionally reduced to avoid stale context. Older broad planning documents were consolidated into `project-overview.md`, `knowledge-architecture.md`, `core-agent-plan.md`, and the workflow-specific guides.

## Planned documentation

- Manual knowledge-base audit reports
- Curated knowledge conversion notes
- Future Google Drive editorial workflow, only after explicit scope decision
- Future Postgres knowledge catalog design, only after explicit data contract
