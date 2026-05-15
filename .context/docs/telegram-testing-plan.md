---
type: doc
name: telegram-testing-plan
description: Practical Telegram testing plan for the Gym Buddy prototype
category: workflow
generated: 2026-05-13
status: draft
language: pt-BR
---

# Telegram Testing Plan

## Ponto importante

O bot do Telegram nao responde diretamente para um numero de telefone.

Para testar usando seu telefone, voce conversa com o bot pelo aplicativo Telegram instalado nesse telefone. O workflow recebe um `chat_id` do Telegram e responde para esse `chat_id`.

## Pre-requisitos

- Bot criado no BotFather.
- Token configurado como credencial no n8n.
- URL publica HTTPS apontando para o n8n local quando usar webhook.
- `WEBHOOK_URL` e `N8N_EDITOR_BASE_URL` atualizados no `.env` quando usar tunnel.

## Caminho recomendado

1. Validar o smoke test local sem Telegram.
2. Criar uma credencial Telegram no n8n.
3. Criar um workflow de Telegram echo com:
   - `Telegram Trigger`
   - node de normalizacao
   - `Telegram Send Message`
4. Testar pelo app Telegram no seu telefone.
5. Exportar o workflow para `.context/workflows/010-telegram-echo-smoke.json`.

O comando `/start` deve ser tratado como onboarding opcional. Para o MVP principal, qualquer primeira mensagem de texto deve iniciar o fluxo de interpretacao do conteudo.

## Workflow de smoke test

O workflow versionado para o primeiro teste Telegram e:

```text
.context/workflows/010-telegram-echo-smoke.json
```

Ele faz apenas:

1. receber mensagem pelo `Telegram Trigger`;
2. extrair `chat.id` e `message.text`;
3. responder no mesmo `chat_id` com uma mensagem fixa de eco.

Nao ha chamada de IA, persistencia propria, regras de treino ou coleta de telefone.

## Tunnel local

Telegram webhooks exigem URL publica HTTPS. Para teste local, usar uma ferramenta temporaria como ngrok ou cloudflared.

Exemplo de valores esperados no `.env` durante o teste com tunnel:

```text
N8N_HOST=<host-publico-do-tunnel>
N8N_PROTOCOL=https
N8N_EDITOR_BASE_URL=https://<host-publico-do-tunnel>
WEBHOOK_URL=https://<host-publico-do-tunnel>/
N8N_SECURE_COOKIE=true
```

Depois de alterar `.env`, reinicie:

```bash
docker compose up -d
```

Nao versionar a URL temporaria gerada pelo tunnel. Ela deve ficar apenas no `.env` local e muda quando o container temporario do tunnel for recriado.

## Importacao segura do workflow Telegram

O workflow `.context/workflows/010-telegram-echo-smoke.json` e versionado como template seguro.

Depois de importar no n8n:

1. Abra o node `Telegram Trigger`.
2. Selecione a credencial real do Telegram criada no n8n.
3. Abra o node `Send Echo Reply`.
4. Selecione a mesma credencial real do Telegram.
5. Salve e ative o workflow.

O arquivo versionado nao deve conter token, ID local real de credencial, telefone, `chat_id` real ou URL temporaria de tunnel.

## Dados permitidos no piloto

Para o primeiro teste, manter apenas dados tecnicos:

- `chat_id`
- texto da mensagem recebida durante a execucao
- timestamp de execucao do n8n

Nao persistir telefone, nome real, historico longo ou perfil de treino nesta etapa.
