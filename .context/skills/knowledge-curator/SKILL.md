---
name: knowledge-curator
description: Convert Gym Buddy knowledge inventory and audit material into reviewed operational artifacts. Use when working with `.context/knowledge/inventory`, `.context/knowledge/audits`, `.context/knowledge/curated`, guardrails, playbooks, response-generation prompts, evaluation cases, or checking that Raw Knowledge is not used directly at runtime.
---

# Knowledge Curator

## Workflow

1. Read `.context/docs/knowledge-architecture.md` and `.context/docs/knowledge-conversion-map.md`.
2. Start from inventory and audit files, not from raw files alone.
3. Classify the destination layer before writing: curated technical knowledge, guardrail, playbook, response-generation pattern, or evaluation case.
4. Preserve traceability to the source inventory or audit.
5. Run the boundary check before considering the work complete:

```powershell
.\.context\scripts\Test-KnowledgeBoundaries.ps1
```

## Runtime Rule

Raw Knowledge never enters runtime prompts, workflows, or Telegram responses directly. Promote only reviewed, compact, operational artifacts.

## Boundaries

Do not create RAG, embeddings, vector databases, new Postgres tables, or Google Drive runtime sync in this phase. Mark unclear or high-risk content as pending instead of converting it into behavior.
