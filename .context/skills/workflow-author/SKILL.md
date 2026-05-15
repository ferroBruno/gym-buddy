---
name: workflow-author
description: Create, revise, and validate Gym Buddy n8n workflow exports. Use when working with `.context/workflows/*.json`, checking n8n export structure, enforcing workflow naming conventions, detecting secrets or local credential IDs, confirming required node types, or updating workflow documentation.
---

# Workflow Author

## Workflow

1. Read `.context/docs/workflow-export-conventions.md` and the workflow-specific doc before changing or validating a workflow.
2. Keep workflow exports in `.context/workflows/` with numeric kebab-case names.
3. Preserve the current architecture: n8n + Postgres, no new backend, no RAG, no custom Postgres tables unless explicitly approved.
4. Validate exports with:

```powershell
.\.context\scripts\Validate-WorkflowExports.ps1
```

5. If workflow behavior changes, update the related doc in `.context/docs/` and ensure `.context/docs/README.md` links it.

## Required Checks

- JSON parses successfully.
- Root object has `name`, `nodes`, and `connections`.
- Nodes have `id`, `name`, `type`, `typeVersion`, and `position`.
- Required node types exist for known workflows.
- Credential IDs are placeholders, not local real IDs.
- No Telegram tokens, API keys, real chat IDs, real user payloads, or temporary tunnel URLs are committed.

## Boundaries

Do not create infrastructure or business rules while authoring workflows. Escalate to project discussion when the workflow needs new memory, new tables, runtime knowledge retrieval, or new external services.
