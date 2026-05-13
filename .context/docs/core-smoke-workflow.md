---
type: doc
name: core-smoke-workflow
description: Local validation guide for the first Gym Buddy core smoke workflow
category: workflow
generated: 2026-05-13
status: active
language: pt-BR
---

# Core Smoke Workflow

## Objetivo

Validar o primeiro core operacional do Gym Buddy sem IA externa e sem Telegram.

Workflow:

```text
.context/workflows/020-gym-buddy-core-smoke.json
```

## O que ele faz

1. Recebe um `POST` local.
2. Normaliza `messageText`.
3. Classifica uma intencao inicial por regras simples.
4. Retorna um contrato JSON com resposta, intent, risco e flags operacionais.

## Contrato de entrada

```json
{
  "channel": "local-smoke",
  "chatId": "local-test",
  "messageText": "posso trocar agachamento por leg press?",
  "messageType": "text"
}
```

## Contrato de saida

```json
{
  "replyText": "string",
  "intent": "onboarding | workout_request | exercise_question | substitution | discomfort | concept_explanation | fallback",
  "riskLevel": "normal | caution | stop",
  "needsClarification": false,
  "shouldPersist": false
}
```

## Teste local

Com o workflow ativo:

```bash
curl -X POST http://localhost:5678/webhook/gym-buddy-core-smoke \
  -H "Content-Type: application/json" \
  -d "{\"channel\":\"local-smoke\",\"chatId\":\"local-test\",\"messageText\":\"posso trocar agachamento por leg press?\",\"messageType\":\"text\"}"
```

## Limites

Este workflow ainda nao e o core final.

Ele nao usa:

- IA generativa;
- Google Drive;
- Postgres customizado;
- memoria de usuario;
- Telegram.

Ele serve para validar contrato, intents iniciais e guardrails basicos antes de conectar ao fluxo Telegram.
