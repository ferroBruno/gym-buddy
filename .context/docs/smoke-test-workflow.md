---
type: doc
name: smoke-test-workflow
description: How to import and validate the local n8n smoke test workflow
category: workflow
generated: 2026-05-13
status: active
language: pt-BR
---

# Smoke Test Workflow

## Objetivo

Validar que o n8n local esta executando workflows e respondendo por webhook antes de configurar Telegram.

Workflow:

```text
.context/workflows/000-smoke-test-local-webhook.json
```

## O que ele faz

1. Recebe um `POST` em um Webhook local.
2. Normaliza um payload simples.
3. Retorna JSON com `ok: true`, texto recebido e `chatId` quando existir no payload.

Esse workflow nao chama Telegram, nao usa credenciais e nao grava dados.

## Importacao manual

No n8n:

1. Abra `http://localhost:5678`.
2. Acesse `Workflows`.
3. Use `Import from File`.
4. Selecione `.context/workflows/000-smoke-test-local-webhook.json`.
5. Salve o workflow.
6. Execute o workflow em modo de teste.

## Teste local

Com o workflow em modo de teste, envie:

```bash
curl -X POST http://localhost:5678/webhook-test/gym-buddy-smoke \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"ola gym buddy\"}"
```

Resposta esperada:

```json
{
  "ok": true,
  "service": "gym-buddy",
  "smokeTest": "local-webhook",
  "receivedText": "ola gym buddy"
}
```

Quando o workflow estiver ativo, use a URL de producao do webhook:

```text
http://localhost:5678/webhook/gym-buddy-smoke
```

## Limite desse teste

Esse smoke test prova a execucao local do n8n. Ele ainda nao prova entrega pelo Telegram.
