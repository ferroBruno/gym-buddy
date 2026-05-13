# Gym Buddy Prompts

This folder stores versioned prompt assets for the Gym Buddy agent core.

The current goal is to keep the core explicit, reviewable, and small before adding heavier automation or knowledge synchronization.

## Structure

- `tech/`: curated technical knowledge approved for use by the agent.
- `guardrails/`: safety, scope, and behavior rules.
- `playbooks/`: operational conversation flows.
- `response-generation/`: final response style, templates, and formatting rules.
- `evaluations/`: fixed test cases and expected behavior.

## Rules

- Do not store secrets here.
- Do not store real user conversations unless anonymized and explicitly intended for evaluation.
- Do not use raw source material directly in runtime prompts.
- Keep prompts small enough to review manually.
