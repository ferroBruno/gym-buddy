---
type: doc
name: n8n-telegram-workflow
description: Target workflow shape for the Telegram and n8n architecture
category: workflow
generated: 2026-05-13
status: filled
language: pt-BR
---

# Workflow n8n + Telegram - Gym Buddy v1

## 1. Objetivo

Este documento define o desenho operacional inicial para a nova rota tecnica do Gym Buddy: usar `n8n` em Docker como orquestrador e `Telegram` como canal de mensageria.

O agente de IA especializado em treinamento permanece como o core do produto, mas sua implementacao detalhada fica adiada. Nesta fase, o contrato tecnico esperado e um endpoint HTTP ou subworkflow chamado pelo n8n.

## 2. Fluxo alvo

1. Usuario envia mensagem ao bot do Telegram.
2. O trigger do Telegram no n8n recebe a mensagem.
3. O workflow normaliza `chat_id`, texto, metadata minima e identificador tecnico da conversa.
4. O workflow identifica se ha uma sessao ativa dentro do escopo da conversa atual.
5. O workflow chama o core do agente de IA ou um subworkflow equivalente.
6. O agente retorna uma resposta curta, acionavel e dentro dos limites do produto.
7. O n8n envia a resposta ao usuario pelo Telegram.
8. O n8n registra apenas eventos operacionais leves para acompanhamento do piloto.

## 3. Nós recomendados no n8n

- `Telegram Trigger`: entrada de mensagens do bot.
- `Set` ou `Code`: normalizacao do payload.
- `IF` ou `Switch`: roteamento simples por etapa ou comando.
- `HTTP Request`: chamada ao futuro core do agente de IA.
- `Telegram`: envio da resposta.
- `Postgres` ou storage interno do n8n: registro operacional minimo.

## 4. Fronteiras protegidas

- O Telegram e apenas o canal de conversa.
- O n8n e o orquestrador de automacao e integracao.
- O core de IA deve concentrar as decisoes do agente de treinamento quando for implementado.
- Dados persistidos devem ser operacionais, nao memoria longitudinal de treino.
- Nenhum segredo do Telegram ou de IA deve ser versionado.

## 5. Escopo desta virada

Incluido agora:

- Docker Compose para n8n com Postgres local.
- Variaveis de ambiente para n8n e Postgres.
- Documentacao da arquitetura alvo e do fluxo inicial.
- Workflow local de smoke test via Webhook.
- Workflow Telegram echo smoke para validar bot, tunnel e resposta pelo telefone.

Adiado:

- desenho final do agente de IA especializado em treinamento
- prompt final do agente
- regras finais de sessao
- persistencia operacional detalhada
- workflow Gym Buddy com regras reais de treino
