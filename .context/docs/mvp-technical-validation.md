---
type: doc
name: mvp-technical-validation
description: Validacao tecnica do workflow MVP Telegram do Gym Buddy
category: workflow
generated: 2026-05-14
status: draft
language: pt-BR
---

# MVP Technical Validation

## Objetivo

Validar se o backend operacional do MVP esta funcional: Telegram entrega a mensagem, n8n executa o workflow, o LLM responde ou falha de forma controlada, e a resposta volta ao usuario.

Este documento nao cria backend novo, tabelas novas, RAG, embeddings ou memoria longitudinal.

## Checks rapidos

Stack:

```powershell
docker compose ps
docker compose logs --tail 80 n8n
docker logs gym-buddy-cloudflared --tail 80
```

Compose:

```powershell
docker compose config --quiet
```

Regressoes conhecidas do workflow MVP:

```powershell
.\.context\scripts\Test-Workflow030Regression.ps1
```

Quando o n8n local estiver rodando, validar tambem a versao ativa que o Telegram executa:

```powershell
.\.context\scripts\Test-Workflow030Regression.ps1 -CheckActiveN8n
```

## Validacao principal pela UI do n8n

Os dados de execucao ficam salvos no Postgres do n8n e podem ser revisados pela interface.

1. Abrir `N8N_EDITOR_BASE_URL`.
2. Entrar em `Executions`.
3. Filtrar pelo workflow `030 - Gym Buddy MVP Telegram`.
4. Abrir a execucao mais recente.
5. Conferir os nodes:
  - `Route And Build Context`: campos do Telegram, intent, risco e rota.
  - `Route And Build Context`: `macro_intent`, `classifier_status` e fallback categorizado quando aplicavel.
   - `Call Local LLM`: chamada ao Ollama quando aplicavel.
   - `Normalize Local LLM Reply`: decisao entre LLM e fallback.
   - `Log Reply`: objeto tecnico estruturado.
   - `Send Reply`: envio final ao Telegram.

Use terminal somente como apoio quando a UI nao mostrar execucao nova.

Ambiente publico usado pelo webhook:

```powershell
Select-String -Path .env -Pattern '^(WEBHOOK_URL|N8N_EDITOR_BASE_URL|N8N_HOST|N8N_PROTOCOL)='
```

O log do n8n deve mostrar:

```text
Activated workflow "030 - Gym Buddy MVP Telegram"
```

## Como saber se o Telegram chegou

Primeiro, olhar a aba `Executions` do n8n.

Se preferir uma checagem tecnica pelo banco, consultar execucoes recentes no Postgres do n8n:

```powershell
docker compose exec postgres psql -U n8n -d n8n -c "select id, \"workflowId\", status, mode, \"startedAt\", \"stoppedAt\" from execution_entity order by id desc limit 20;"
```

Interpretacao:

- sem execucao nova: Telegram nao chegou ao n8n; checar tunnel, URL publica e workflow ativo;
- execucao `success`: o fluxo rodou ate o fim;
- execucao `error`: mensagem chegou, mas algum node falhou.

## Como ver a causa de uma falha

Trocar `18` pelo ID da execucao:

```powershell
docker compose exec postgres psql -U n8n -d n8n -t -A -c "select data from execution_data where \"executionId\"=18;"
```

Procurar:

- `lastNodeExecuted`;
- `message`;
- `description`;
- `httpCode`;
- `llm_error_message`.

## Logs de conversa no MVP

O workflow `030` registra um log estruturado na propria execucao do n8n, no node `Log Reply`.

O terminal tambem recebe uma copia com prefixo:

```text
GYM_BUDDY_TECH_LOG
```

Campos previstos:

- `channel`;
- `user_id`;
- `chat_id`;
- `username`;
- `message_id`;
- `message_type`;
- `message_text`;
- `is_feedback`;
- `feedback_value`;
- `requires_llm`;
- `llm_status`;
- `llm_error_code`;
- `llm_error_message`;
- `reply_text`;
- `received_at`;
- `handled_at`.

Para consultar logs recentes:

```powershell
docker compose logs --tail 200 n8n | Select-String 'GYM_BUDDY_TECH_LOG'
```

## Falha controlada do LLM local

Se o Ollama/local LLM retornar erro ou resposta vazia, o workflow deve:

- continuar a execucao;
- registrar `llm_status: error`;
- registrar codigo e mensagem do erro;
- responder ao usuario que a mensagem chegou, mas o motor de IA nao conseguiu responder naquele momento.

Isso evita silencio no Telegram e separa problema de canal de problema de provedor LLM.

## Checklist de teste

1. Confirmar tunnel ativo e URL no `.env`.
2. Recriar o container n8n quando a URL mudar:

```powershell
docker compose up -d --force-recreate n8n
```

3. Confirmar workflow ativo nos logs.
4. Enviar uma primeira mensagem livre no Telegram, por exemplo `quero um treino de 30 min`.
5. Consultar `execution_entity`.
6. Se falhar, consultar `execution_data`.
7. Confirmar se existe `GYM_BUDDY_TECH_LOG`.
8. Enviar `/start` apenas como teste opcional de onboarding.
9. Verificar se houve resposta ou falha controlada.
