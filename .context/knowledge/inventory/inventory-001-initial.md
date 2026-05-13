---
type: knowledge_inventory
name: inventory-001-initial
description: Initial local inventory for Gym Buddy raw-sample knowledge material
category: knowledge
generated: 2026-05-13
status: draft
language: pt-BR
---

# Inventory 001 - Initial Knowledge Base Inventory

## Scope

This inventory records the initial local file-level review of `.context/knowledge/raw-sample/` in the repository `ferroBruno/gym-buddy`, branch `execucao`.

This is an inventory only. It is not a deep audit, conversion, runtime implementation, RAG design, embedding setup, n8n workflow, Postgres catalog, Google Drive integration, or curated knowledge promotion.

No long excerpts or document content were copied into this inventory. Apparent topics and recommendations are preliminary and based on file names, file type, and local path only.

## Central Rule

Raw Knowledge must never be used directly by the agent during user support. Any raw material must remain an input for human review and later conversion into an approved knowledge layer before it can affect operational behavior.

## Search Summary

Date: 2026-05-13

Searched locations:

| Path | Result |
|---|---|
| `.context/knowledge/raw-sample/` | Present; 10 PDF files cataloged |

## Inventory Result

The batch contains exercise science, hypertrophy, resistance training, movement classification, longevity, and anatomy-oriented PDFs. All items remain Raw Knowledge. None is approved for runtime, RAG, embeddings, workflow logic, or direct response generation.

## Items

| ID | Name | Path | Type | Apparent topic | Recommended layer | Priority | Direct use risk | Sensitive flags | Conversion recommendation |
|---|---|---|---|---|---|---|---|---|---|
| `local-001` | `Adding years to life and life to years.pdf` | `.context/knowledge/raw-sample/Adding years to life and life to years.pdf` | pdf | Longevity and general health benefits of physical activity | `curated_technical_knowledge` | medium | medium | `clinical_condition`, `promise_of_results` | Review manually and extract only conservative, non-prescriptive general principles with clear scope limits. |
| `local-002` | `Classificação das habilidades de movimento.pdf` | `.context/knowledge/raw-sample/Classificação das habilidades de movimento.pdf` | pdf | Movement skill classification | `session_playbooks` | medium | medium | `individual_prescription` | Convert, after review, into simple movement taxonomy notes that support exercise explanation without prescribing individualized progression. |
| `local-003` | `Effects of resistance training performed to repetition failure or non-failure.pdf` | `.context/knowledge/raw-sample/Effects of resistance training performed to repetition failure or non-failure.pdf` | pdf | Training to failure versus non-failure in resistance training | `curated_technical_knowledge` | high | high | `individual_prescription`, `absolute_load`, `promise_of_results` | Review evidence quality and convert only into bounded guidance for general training variables, avoiding direct intensity prescriptions. |
| `local-004` | `Give it a rest a systematic review with Bayesian meta-analysis on the effect of inter-set rest interval duration on muscle hypertrophy.pdf` | `.context/knowledge/raw-sample/Give it a rest a systematic review with Bayesian meta-analysis on the effect of inter-set rest interval duration on muscle hypertrophy.pdf` | pdf | Inter-set rest intervals and hypertrophy | `curated_technical_knowledge` | high | high | `individual_prescription`, `absolute_load`, `promise_of_results` | Review and summarize as general principles for rest interval tradeoffs; do not convert into fixed prescriptions without human approval. |
| `local-005` | `New evidence review of data from 30,000+ participants finds the biggest benefits come from consistency, not complicated programs.pdf` | `.context/knowledge/raw-sample/New evidence review of data from 30,000+ participants finds the biggest benefits come from consistency, not complicated programs.pdf` | pdf | Consistency and simplicity in exercise programs | `behavioral_safety_guardrails` | high | medium | `clinical_condition`, `promise_of_results` | Review for broad behavioral principles that encourage consistency while avoiding health guarantees or individualized claims. |
| `local-006` | `Periodization for Maximizing Hypertrophy - IDEA Health & Fitness Association.pdf` | `.context/knowledge/raw-sample/Periodization for Maximizing Hypertrophy - IDEA Health & Fitness Association.pdf` | pdf | Periodization for hypertrophy | `curated_technical_knowledge` | medium | high | `individual_prescription`, `absolute_load`, `promise_of_results` | Review source and convert only into general periodization concepts, not direct program design rules. |
| `local-007` | `Periodized Resistance Training for Enhancing Skeletal Muscle Hypertrophy.pdf` | `.context/knowledge/raw-sample/Periodized Resistance Training for Enhancing Skeletal Muscle Hypertrophy.pdf` | pdf | Periodized resistance training and hypertrophy | `curated_technical_knowledge` | high | high | `individual_prescription`, `absolute_load`, `promise_of_results` | Review evidence and convert into traceable technical notes about periodization variables with explicit non-prescriptive boundaries. |
| `local-008` | `Resistance Training Variables for Optimization of Muscle Hypertrophy.pdf` | `.context/knowledge/raw-sample/Resistance Training Variables for Optimization of Muscle Hypertrophy.pdf` | pdf | Resistance training variables for hypertrophy | `curated_technical_knowledge` | high | high | `individual_prescription`, `absolute_load`, `promise_of_results` | Review manually and split into narrowly scoped concepts before any curated conversion; avoid direct runtime use. |
| `local-009` | `STRENGTH AND HYPERTROPHY ADAPTATIONS.pdf` | `.context/knowledge/raw-sample/STRENGTH AND HYPERTROPHY ADAPTATIONS.pdf` | pdf | Strength and hypertrophy adaptations | `curated_technical_knowledge` | high | high | `individual_prescription`, `absolute_load`, `promise_of_results` | Review and extract only general adaptation principles with traceability to the raw source and no direct programming claims. |
| `local-010` | `Trilhos Anatômicos (Tomas Myers).pdf` | `.context/knowledge/raw-sample/Trilhos Anatômicos (Tomas Myers).pdf` | pdf | Anatomy, fascial lines, and movement relationships | `curated_technical_knowledge` | low | high | `injury`, `clinical_condition`, `rehabilitation`, `individual_prescription` | Keep raw until a manual review decides whether any non-clinical anatomy concepts are appropriate for curated use. |

## Constraints Preserved

- Raw Knowledge does not enter runtime.
- No RAG was created.
- No embeddings were created.
- No n8n workflow was created.
- No permanent script was created.
- No raw file was moved into a curated layer.

## Next Steps

1. Run a manual audit before any conversion.
2. Validate publication/source quality and dates during the audit.
3. Convert only reviewed, approved points into curated artifacts in a later explicit scope.
4. Keep `.context/knowledge/raw-sample/` ignored by Git and local-only.
