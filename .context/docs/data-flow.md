---
type: doc
name: data-flow
description: How data moves through the system and external integrations
category: data-flow
generated: 2026-05-13
status: filled
language: pt-BR
---

# Data Flow & Integrations - Gym Buddy v1

## 1. Fluxo principal

```text
Telegram user
  -> Telegram Bot API
  -> n8n Telegram Trigger
  -> payload normalization
  -> session/workflow routing
  -> future AI agent core
  -> response formatter
  -> Telegram send message
```

## 2. Entrada

O payload de entrada deve ser normalizado para um formato interno simples:

```json
{
  "channel": "telegram",
  "chatId": "string",
  "messageId": "string",
  "text": "string",
  "receivedAt": "ISO-8601"
}
```

## 3. Saida

A resposta para o Telegram deve conter apenas o necessario para enviar a proxima mensagem:

```json
{
  "chatId": "string",
  "text": "string"
}
```

## 4. Fronteira com o agente de IA

Contrato inicial previsto:

```json
{
  "channel": "telegram",
  "chatId": "string",
  "message": "string",
  "sessionContext": {
    "currentStep": "string",
    "declaredGoal": "string",
    "availableTime": "string"
  }
}
```

Resposta esperada:

```json
{
  "reply": "string",
  "sessionContextPatch": {
    "currentStep": "string"
  },
  "operationalEvents": []
}
```

Este contrato ainda e preliminar. Ele existe apenas para orientar a integracao n8n -> agente sem fixar regras de negocio antes da discussao do core.

## 5. Dados persistidos

Persistencia permitida:

- configuracoes internas do n8n
- credenciais criptografadas no n8n
- historico tecnico de execucoes
- eventos operacionais leves do piloto

Persistencia proibida nesta v1:

- memoria funcional entre sessoes
- historico de treino usado para personalizar respostas futuras
- perfil longitudinal do usuario

## 6. Integracoes externas

### Telegram

Usado como canal de mensageria da v1.

### Core de IA

Ainda nao definido. Deve ser integrado por HTTP Request no n8n ou por subworkflow quando o desenho do agente estiver pronto.

### Provedor de IA

Ainda nao definido. Nao deve ser assumido nos workflows ate a decisao tecnica do core.
