---
type: doc
name: tooling
description: Scripts, IDE settings, automation, and developer productivity tips
category: tooling
generated: 2026-05-13
status: filled
language: pt-BR
---

# Tooling & Technology Decision - Gym Buddy v1

## 1. Objetivo

Este documento define o stack minimo viavel apos a mudanca de rota tecnica do Gym Buddy v1.

A prioridade agora e operar uma experiencia conversacional com menor complexidade usando `n8n` em Docker e `Telegram` como mensageria. O agente de IA especializado em treinamento sera detalhado depois, mantendo uma fronteira simples de integracao.

## 2. Stack recomendado

- Orquestracao: `n8n`
- Runtime local: `Docker Compose`
- Banco interno do n8n: `Postgres`
- Mensageria: `Telegram Bot API`
- Core de IA: decisao adiada, integrado futuramente por HTTP ou subworkflow
- Conhecimento curado: arquivos versionados em Markdown, YAML ou JSON
- Observabilidade inicial: historico de execucoes do n8n e registros operacionais leves

## 3. Por que esta combinacao

Esta combinacao atende melhor a nova fase porque:

- reduz a quantidade de codigo proprio necessario para validar o fluxo
- usa ferramentas gratuitas para desenvolvimento local
- acelera iteracao em workflows conversacionais
- facilita integracoes futuras sem criar infraestrutura pesada
- preserva uma fronteira clara para o agente de IA especializado

## 4. Execucao local

Para a stack principal:

```bash
cp .env.example .env
docker compose config --quiet
docker compose up -d
```

O n8n fica disponivel em:

```text
http://localhost:5678
```

## 5. Variaveis de ambiente

### n8n

- `N8N_HOST`
- `N8N_PORT`
- `N8N_PROTOCOL`
- `WEBHOOK_URL`
- `N8N_ENCRYPTION_KEY`
- `GENERIC_TIMEZONE`

### Banco interno

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`

### Telegram

O token deve ser criado no BotFather e configurado como credencial no n8n. O token real nao deve ser versionado.

### Futuro core de IA

O core do agente ainda nao foi implementado. Quando existir, a fronteira recomendada continua sendo HTTP ou subworkflow, sem adicionar backend proprio antes de uma decisao explicita.

## 6. Regras de implementacao

- Nao versionar tokens reais do Telegram, chaves de IA ou senhas.
- Preferir workflows simples e legiveis no n8n.
- Manter o core de treinamento separado da mecanica de mensageria quando isso reduzir acoplamento.
- Persistir apenas dados tecnicos e operacionais necessarios.
- Nao criar memoria longitudinal do usuario nesta v1.

## 8. O que fica adiado

- escolha final do provedor de IA
- contrato completo do agente de treinamento
- schema de eventos operacionais
- deploy publico do n8n
- estrategia de tunnel/webhook para ambiente local
