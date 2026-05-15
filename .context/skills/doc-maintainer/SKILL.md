---
name: doc-maintainer
description: Maintain Gym Buddy documentation indexes, README references, and internal markdown links. Use when adding or changing `.context/docs`, `.context/skills`, `.context/workflows`, README content, cross-references, or validating documentation discoverability.
---

# Doc Maintainer

## Workflow

1. Update the nearest relevant doc when behavior or process changes.
2. Add new docs to `.context/docs/README.md`.
3. Ensure `README.md` still points to the current source of truth.
4. Validate local markdown links:

```powershell
.\.context\scripts\Test-DocLinks.ps1
```

## Required References

- Root `README.md` should stay concise and point to `.context/docs/README.md`.
- `.context/docs/README.md` should index project docs, workflow docs, and automation catalog docs.
- `.context/skills/README.md` should list local skills.

## Boundaries

Do not update docs to describe behavior that has not been implemented or explicitly approved.
