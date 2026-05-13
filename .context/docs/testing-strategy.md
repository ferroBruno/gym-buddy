---
type: doc
name: testing-strategy
description: Testing strategy and quality baseline for Gym Buddy v1
category: testing
generated: 2026-05-13
status: filled
language: pt-BR
---

# Testing Strategy - Gym Buddy v1

## 1. Objetivo

Este documento define como validar a rota atual do Gym Buddy v1: Telegram como canal, n8n como orquestrador e um futuro core de IA especializado em treinamento.

## 2. Guardrails obrigatorios

Toda validacao deve preservar que Gym Buddy v1 e:

- exclusivamente free
- inicialmente Telegram-first
- conduzido por agente de IA
- orientacao geral e nao personalizada
- sustentado por base curada por especialistas
- centrado em sessoes guiadas passo a passo
- limitado ao contexto da sessao atual
- sem memoria funcional entre sessoes
- sem premium, monetizacao ou personalizacao longitudinal

## 3. Camadas de validacao

### 3.1 Infra local

Validar:

- `docker compose up -d` sobe n8n e Postgres
- n8n abre em `http://localhost:5678`
- volumes persistem configuracao local do n8n
- `.env.example` nao contem segredo real

### 3.2 Workflow Telegram

Validar:

- Telegram Trigger recebe mensagem do bot
- payload e normalizado para `chatId`, `messageId`, `text` e `receivedAt`
- workflow ignora eventos inesperados ou sem texto
- resposta volta ao mesmo `chatId`
- tokens nao aparecem em logs ou nodes exportados

### 3.3 Fronteira com agente de IA

Quando o core existir, validar:

- contrato HTTP minimo
- autenticacao interna
- payload sem historico longitudinal
- resposta curta e acionavel
- atualizacao de contexto restrita a sessao atual

### 3.4 Comportamento conversacional

Validar:

- uma acao principal por mensagem
- progressao passo a passo
- ausencia de treino completo despejado no inicio
- clareza sobre orientacao geral
- ausencia de linguagem que implique memoria ou acompanhamento individual

## 4. Testes negativos criticos

- o sistema envia o treino inteiro logo no inicio
- o sistema usa linguagem como "com base no seu historico"
- uma nova sessao reaproveita preferencias ou progresso anterior
- o fluxo sugere premium, upsell ou coaching pago
- o workflow registra tokens ou mensagens completas sem necessidade

## 5. Scripts manuais iniciais

### 5.1 Smoke da stack

1. Criar `.env` a partir de `.env.example`.
2. Rodar `docker compose up -d`.
3. Abrir `http://localhost:5678`.
4. Confirmar que n8n e Postgres estao saudaveis.

### 5.2 Smoke do Telegram

1. Criar bot no BotFather.
2. Configurar credencial no n8n.
3. Criar workflow com `Telegram Trigger`.
4. Enviar mensagem ao bot.
5. Confirmar resposta pelo Telegram.

### 5.3 Sessao sem memoria

1. Iniciar conversa.
2. Encerrar a sessao.
3. Iniciar nova conversa depois.
4. Confirmar que nao ha uso de progresso, preferencias ou contexto anterior.

## 6. Quality gates

Antes de considerar a nova rota pronta para continuar:

- stack Docker sobe localmente
- n8n acessivel
- credencial Telegram configuravel sem segredo versionado
- workflow minimo Telegram -> resposta funciona
- docs apontam para n8n + Telegram como rota atual
- decisoes sobre o core de IA estao explicitamente adiadas
