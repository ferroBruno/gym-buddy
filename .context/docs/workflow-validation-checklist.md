---
type: doc
name: workflow-validation-checklist
description: Checklist inicial para validacao de exports JSON de workflows n8n
category: workflow
generated: 2026-05-15
status: draft
language: pt-BR
---

# Workflow Validation Checklist

## Objetivo

Definir a primeira rotina de validacao do `workflow-author` antes de transformar os checks em script permanente.

## Checklist estrutural

- O arquivo esta em `.context/workflows/`.
- O nome do arquivo usa prefixo numerico e kebab-case.
- O arquivo e JSON valido.
- O objeto raiz contem `name`.
- O objeto raiz contem `nodes`.
- O objeto raiz contem `connections`.
- O workflow tem pelo menos um node.
- Cada node tem `id`, `name`, `type`, `typeVersion` e `position`.

## Checklist de seguranca

- Nao contem token do Telegram.
- Nao contem chave de API.
- Nao contem credencial OAuth.
- Nao contem `chat_id` real.
- Nao contem payload real de usuario.
- Nao contem URL temporaria de tunnel.
- Nao contem ID local real de credencial.

## Checklist operacional

- O workflow tem documentacao relacionada em `.context/docs/`.
- O comportamento esperado esta descrito.
- O modo de teste esta documentado.
- Dependencias externas estao explicitas.
- Falhas esperadas tem fallback ou instrucao de diagnostico.

## Nodes minimos esperados

| Workflow | Nodes minimos |
|---|---|
| `000-smoke-test-local-webhook.json` | `webhook`, `code` |
| `010-telegram-echo-smoke.json` | `telegramTrigger`, `code`, `telegram` |
| `020-gym-buddy-core-smoke.json` | `webhook`, `code` |
| `030-gym-buddy-mvp-telegram.json` | `telegramTrigger`, roteamento/contexto, fallback ou LLM, log, `telegram` |

## Criterio de sucesso

O export esta apto para importacao manual no n8n, revisao por diff e smoke test conforme a documentacao correspondente.

## Ponto de decisao

Depois de validar este checklist manualmente em pelo menos um workflow, decidir se ele vira script em `.context/scripts/`.
