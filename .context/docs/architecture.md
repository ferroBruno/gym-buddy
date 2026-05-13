---
type: doc
name: architecture
description: System architecture, layers, patterns, and design decisions
category: architecture
generated: 2026-05-13
status: filled
language: pt-BR
---

# Architecture Notes - Gym Buddy v1

## 1. Objetivo

Este documento define a nova rota tecnica do Gym Buddy v1: uma arquitetura simples baseada em `n8n` via Docker Compose e `Telegram` como canal de mensageria.

O objetivo imediato e reduzir complexidade operacional, manter custo zero na fase de validacao e deixar o projeto pronto para conectar um agente de IA especializado em treinamento em uma etapa posterior.

## 2. Guardrails obrigatorios

A arquitetura da v1 deve preservar:

- produto exclusivamente free
- experiencia conversacional simples via Telegram
- orientacao geral e nao personalizada
- sessoes guiadas passo a passo
- uso apenas do contexto da sessao atual
- ausencia de memoria longitudinal
- base curada por especialistas como fonte de qualidade
- operacao enxuta para aprendizado de piloto
- custo operacional zero ou o mais proximo possivel disso

## 3. Arquitetura de alto nivel

### 3.1 Componentes principais

#### Canal Telegram

Responsabilidade:

- receber mensagens do usuario
- entregar respostas do agente
- servir como interface inicial da experiencia

#### n8n

Responsabilidade:

- hospedar o workflow conversacional
- receber eventos do Telegram
- normalizar entrada e saida
- rotear comandos e mensagens
- chamar o core do agente de IA quando ele estiver definido
- registrar eventos operacionais minimos do piloto

Na nova rota, `n8n` e o orquestrador principal da v1.

#### Banco do n8n

Responsabilidade:

- persistir configuracoes, credenciais criptografadas e estado interno do n8n
- sustentar execucoes e workflows locais

Na stack local, esse papel e atendido por `Postgres` no Docker Compose.

#### Core do agente de IA

Responsabilidade futura:

- aplicar regras de sessao
- selecionar conhecimento curado relevante
- gerar respostas dentro dos limites do produto
- manter a logica especializada de treinamento fora do workflow visual quando isso reduzir complexidade

Neste momento, o core do agente ainda nao esta detalhado. A fronteira tecnica prevista e uma chamada HTTP ou subworkflow do n8n.

#### Camada de conhecimento curado

Responsabilidade:

- disponibilizar regras, principios e referencias curadas por especialistas
- sustentar consistencia tecnica da orientacao
- fornecer insumos para a sessao sem virar memoria de usuario

#### Registro operacional minimo

Responsabilidade:

- registrar inicio e fim de sessao
- registrar mensagens fora de escopo, friccoes e sinais de valor percebido
- apoiar aprendizado do piloto sem criar memoria funcional entre sessoes

## 4. Fluxo de alto nivel

1. Usuario envia mensagem ao bot do Telegram.
2. O `Telegram Trigger` do n8n recebe o evento.
3. O workflow normaliza o payload para um formato interno simples.
4. O workflow identifica comando, etapa ou intencao imediata.
5. O workflow chama o core do agente de IA ou uma resposta provisoria controlada.
6. O agente retorna a proxima resposta da sessao.
7. O n8n envia a resposta ao usuario pelo Telegram.
8. O n8n registra apenas eventos operacionais leves.

## 5. Estado e memoria

### 5.1 Estado de sessao

O estado usado para conduzir uma conversa deve ser minimo e limitado a sessao atual.

Exemplos adequados:

- etapa atual
- objetivo pratico declarado para hoje
- tempo disponivel agora
- disponibilidade imediata de equipamento
- ultimo passo entregue

### 5.2 Persistencia permitida

Pode existir persistencia tecnica e operacional para:

- funcionamento do n8n
- execucoes de workflow
- credenciais criptografadas
- eventos leves do piloto
- diagnostico tecnico

Essa persistencia nao pode ser usada como memoria funcional do treino.

### 5.3 Persistencia proibida

Permanece fora de escopo:

- memoria longitudinal do usuario
- perfil historico de treino
- personalizacao entre sessoes
- continuidade automatica baseada em conversas antigas
- motor de recomendacao individual

## 6. Arquitetura local

A stack local inicial e:

- `Docker Compose`
- `n8n`
- `Postgres` para o banco interno do n8n
- bot do Telegram configurado por credencial no n8n

O backend TypeScript anterior foi removido da rota limpa da v1. Se o core do agente precisar de codigo proprio no futuro, ele deve ser criado a partir de um contrato novo e minimo, nao por dependencia implicita da arquitetura antiga.

## 7. Decisoes fixadas nesta virada

- Telegram substitui WhatsApp como canal inicial.
- n8n e o orquestrador principal da v1.
- Docker Compose passa a ser o caminho padrao de execucao local.
- O core do agente de IA sera detalhado separadamente.
- Persistencia continua limitada a necessidades tecnicas e operacionais, sem memoria longitudinal.

## 8. Decisoes adiadas

- formato final do core do agente de IA
- provedor/modelo de IA
- prompts finais e regras detalhadas de treinamento
- estrutura definitiva da base curada
- schema de eventos operacionais

## 9. Proximos trabalhos

1. Subir a stack local com `docker compose up -d`.
2. Criar o bot no Telegram via BotFather e configurar a credencial no n8n.
3. Montar o primeiro workflow Telegram -> normalizacao -> resposta controlada -> Telegram.
4. Definir o contrato HTTP do core do agente de IA.
5. Definir se o core sera implementado como servico HTTP proprio, subworkflow do n8n ou outro modulo simples.
