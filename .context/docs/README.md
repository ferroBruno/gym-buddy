# Documentation Index

This directory is the canonical product context for Gym Buddy v1. Start with the brief, then use the overview and the operational PRD before planning UX, architecture, or implementation work.

## Product Sources Of Truth
- [Project Brief](./project-brief.md) - Foundational strategic briefing artifact
- [Project Overview](./project-overview.md) - Consolidated agent-facing source of truth for v1
- [Product Requirements v1](./product-requirements-v1.md) - Operational PRD distilled for future execution
- [WhatsApp Conversational UX](./whatsapp-conversational-ux.md) - Conversational UX specification for guided workout sessions
- [Architecture Notes](./architecture.md) - Minimum viable system architecture for the v1 guided session product
- [Tooling & Productivity Guide](./tooling.md) - Minimum viable implementation stack and tooling decisions for v1
- [Glossary](./glossary.md) - Stable domain vocabulary and boundary terms

## Current Status
- `project-brief.md` is the strategic base document and must be preserved.
- `project-overview.md` normalizes the v1 scope and key product logic across the brief and PRD.
- `product-requirements-v1.md` captures the actionable PRD details, open questions, and deferred items.
- `whatsapp-conversational-ux.md` defines the end-to-end session model for the WhatsApp experience.
- `architecture.md` defines the minimum viable system design for running guided sessions within v1 constraints.
- `tooling.md` defines the implementation stack and operational tooling baseline for the v1 pilot.
- `testing-strategy.md` now defines the v1 quality baseline, including testing layers, negative tests, manual validation scripts, and pilot gates.
- `architecture.md` and `tooling.md` now explicitly separate `Supabase Postgres` persistent operational storage from `Redis` ephemeral session state.
- `glossary.md` protects the domain language that future agents should reuse.

## Reserved Scaffolds
- [Development Workflow](./development-workflow.md) - Reserved for engineering workflow details
- [Testing Strategy](./testing-strategy.md) - Active testing and quality baseline for v1
- [Data Flow & Integrations](./data-flow.md) - Reserved for future system and integration detail
- [Security & Compliance Notes](./security.md) - Reserved for future risk and compliance detail
- [Tooling & Productivity Guide](./tooling.md) - Active stack baseline for implementation planning

## Document Map
| Guide | File | Role | Primary Inputs |
| --- | --- | --- | --- |
| Project Brief | `project-brief.md` | Strategic framing | Stakeholder framing, product intent |
| Project Overview | `project-overview.md` | Consolidated v1 truth | Project brief, PRD |
| Product Requirements v1 | `product-requirements-v1.md` | Operational product reference | PRD, project brief |
| WhatsApp Conversational UX | `whatsapp-conversational-ux.md` | Session-level UX specification | Project overview, operational PRD |
| Architecture Notes | `architecture.md` | Minimum viable system design | Project overview, operational PRD, UX spec |
| Tooling & Productivity Guide | `tooling.md` | Minimum viable implementation stack | Project brief, PRD, UX spec, architecture |
| Testing Strategy | `testing-strategy.md` | Validation and quality baseline | PRD, UX spec, architecture, tooling, implementation plan |
| Glossary | `glossary.md` | Domain language and guardrails | Project brief, PRD |
| Development Workflow | `development-workflow.md` | Future engineering workflow reference | Repository process decisions |
| Data Flow & Integrations | `data-flow.md` | Future technical flow reference | Architecture decisions |
| Security & Compliance Notes | `security.md` | Future security reference | Architecture and policy decisions |
