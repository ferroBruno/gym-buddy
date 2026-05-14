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

Ambiente publico usado pelo webhook:

```powershell
Select-String -Path .env -Pattern '^(WEBHOOK_URL|N8N_EDITOR_BASE_URL|N8N_HOST|N8N_PROTOCOL)='
```

O log do n8n deve mostrar:

```text
Activated workflow "030 - Gym Buddy MVP Telegram"
```

## Como saber se o Telegram chegou

Consultar execucoes recentes no Postgres do n8n:

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

O workflow `030` registra um log estruturado na propria execucao do n8n e tambem em `console.log` com prefixo:

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

## Falha controlada do LLM

Se a OpenAI retornar erro, por exemplo `insufficient_quota`, o workflow deve:

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
4. Enviar `/start` no Telegram.
5. Consultar `execution_entity`.
6. Se falhar, consultar `execution_data`.
7. Confirmar se existe `GYM_BUDDY_TECH_LOG`.
8. Enviar `Gostaria de um treino rapido de 30 min`.
9. Verificar se houve resposta ou falha controlada.
