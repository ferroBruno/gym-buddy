# Documentation Index

This directory is the canonical product context for Gym Buddy v1. Start with the brief, then use the overview, architecture, tooling, and workflow documents before planning implementation work.

## Product Sources Of Truth
- [Project Brief](./project-brief.md) - Foundational strategic briefing artifact
- [Project Overview](./project-overview.md) - Consolidated agent-facing source of truth for v1
- [Product Requirements v1](./product-requirements-v1.md) - Operational PRD distilled for future execution
- [Architecture Notes](./architecture.md) - Current n8n + Telegram architecture for the v1 guided session product
- [Tooling & Productivity Guide](./tooling.md) - Current Docker Compose, n8n, Postgres, and Telegram tooling baseline
- [n8n Telegram Workflow](./n8n-telegram-workflow.md) - Target workflow shape for the Telegram and n8n architecture
- [Glossary](./glossary.md) - Stable domain vocabulary and boundary terms

## Current Status
- `project-brief.md` is the strategic base document and must be preserved.
- `project-overview.md` normalizes the v1 scope and key product logic after the Telegram/n8n direction change.
- `product-requirements-v1.md` captures the actionable PRD details, open questions, and deferred items.
- `architecture.md` defines the current n8n + Telegram system design.
- `tooling.md` defines the current Docker Compose and n8n operational baseline.
- `n8n-telegram-workflow.md` defines the first target workflow shape.
- `testing-strategy.md` remains useful for quality guardrails, but channel-specific details should be refreshed before implementation.
- `glossary.md` protects the domain language that future agents should reuse.

## Operational References
- [Testing Strategy](./testing-strategy.md) - Active testing and quality baseline for v1
- [Data Flow & Integrations](./data-flow.md) - Current Telegram, n8n, and future-agent integration flow
- [Security & Compliance Notes](./security.md) - Current security and secrets baseline
- [Tooling & Productivity Guide](./tooling.md) - Active stack baseline for implementation planning

## Document Map
| Guide | File | Role | Primary Inputs |
| --- | --- | --- | --- |
| Project Brief | `project-brief.md` | Strategic framing | Stakeholder framing, product intent |
| Project Overview | `project-overview.md` | Consolidated v1 truth | Project brief, PRD |
| Product Requirements v1 | `product-requirements-v1.md` | Operational product reference | PRD, project brief |
| Architecture Notes | `architecture.md` | Current minimum viable system design | Project overview, user direction, workflow doc |
| Tooling & Productivity Guide | `tooling.md` | Current implementation stack | Architecture, workflow doc |
| n8n Telegram Workflow | `n8n-telegram-workflow.md` | Target workflow shape | Architecture, tooling |
| Testing Strategy | `testing-strategy.md` | Validation and quality baseline | PRD, UX spec, architecture, tooling, implementation plan |
| Glossary | `glossary.md` | Domain language and guardrails | Project brief, PRD |
| Data Flow & Integrations | `data-flow.md` | Future technical flow reference | Architecture decisions |
| Security & Compliance Notes | `security.md` | Future security reference | Architecture and policy decisions |
