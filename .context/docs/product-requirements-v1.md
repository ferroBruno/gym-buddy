---
type: doc
name: product-requirements-v1
description: Operational PRD for Gym Buddy v1 based on the project brief and the provided PRD
category: product
generated: 2026-04-14
status: filled
language: pt-BR
---

# Product Requirements Document - Gym Buddy v1

## 1. Objetivo do documento

Este documento operacionaliza o PRD do Gym Buddy v1 dentro de `.context/` para uso de futuros agentes. Ele deve ser lido junto com [project-brief.md](./project-brief.md) e [project-overview.md](./project-overview.md).

## 2. Fontes primarias

- `.context/docs/project-brief.md`
- PRD fornecido na conversa em 2026-04-14

## 3. Verdade do produto que deve ser preservada

O Gym Buddy v1 e:

- exclusivamente a versao gratuita
- `WhatsApp-first`
- conduzido por agente de IA
- baseado em orientacao geral, nao personalizada
- sustentado por base de conhecimento curada por especialistas em treinamento
- centrado em sessoes guiadas de treino
- conduzido passo a passo durante a sessao
- orientado apenas pelo contexto da sessao atual
- sem memoria entre sessoes
- sem premium, monetizacao ou personalizacao longitudinal nesta fase

## 4. Objetivos da v1

- validar um MVP `WhatsApp-first` com baixa friccao de entrada
- testar se orientacao geral guiada passo a passo gera valor pratico
- validar utilidade, confianca, retorno de uso e potencial de alcance
- observar se a curadoria tecnica aumenta percepcao de qualidade
- gerar aprendizado suficiente para orientar a proxima fase sem depender dela

## 5. Escopo do MVP

### Em escopo

- entrada via WhatsApp
- apresentacao clara do servico e de seus limites
- onboarding simples por sessao
- enquadramento geral do usuario dentro do escopo do free
- conducao da sessao de treino passo a passo
- entrega progressiva, sem mandar o treino inteiro no inicio
- uso apenas do contexto da conversa atual para decidir o proximo passo
- adaptacoes simples e nao personalizadas:
  - versao mais curta da sessao
  - substituicao simples por equipamento indisponivel
  - reorganizacao basica da sessao
- encerramento claro da sessao
- registro operacional minimo para o piloto

### Fora de escopo

- premium
- monetizacao
- billing e assinaturas
- personalizacao individual profunda
- memoria longitudinal no free
- armazenamento de evolucao entre sessoes
- acompanhamento humano individualizado
- app proprio
- painel administrativo robusto
- automacao avancada
- infraestrutura de escala
- casos clinicos complexos
- respostas que exijam julgamento tecnico individual

## 6. Logica central da experiencia

### Modelo de sessao

- cada sessao comeca e termina em si mesma
- o sistema pode usar o contexto acumulado dentro da conversa atual
- o sistema nao deve tratar uma nova conversa como continuacao personalizada da anterior

### Logica de UX

- uma instrucao relevante por vez
- foco em acao imediata durante o treino real
- mensagens curtas, diretas e acionaveis
- linguagem simples, sem jargao desnecessario
- clareza constante sobre IA, escopo geral e ausencia de memoria entre sessoes

### Regra de ouro

O produto deve parecer uma sessao guiada, nao uma ficha estatica em formato de chat.

## 7. Requisitos funcionais consolidados

- permitir inicio da experiencia pelo WhatsApp com baixa friccao
- explicar que o servico usa IA e oferece orientacao geral, nao personalizada
- informar que a qualidade da orientacao vem de base curada por especialistas
- coletar apenas o minimo necessario para a sessao atual
- conduzir a sessao progressivamente e decidir o proximo passo a partir da interacao atual
- nao entregar o treino completo de uma vez
- suportar adaptacoes simples sem criar expectativa de personalizacao profunda
- limitar ou redirecionar pedidos fora do escopo do free
- manter consistencia de tom, estrutura e limites ao longo da experiencia
- deixar claro que o free usa logica de sessoes independentes
- encerrar cada sessao de forma clara
- registrar minimamente sinais de uso, duvidas, friccao e valor percebido

## 8. Requisitos nao funcionais consolidados

- clareza para usuarios leigos
- consistencia de linguagem e limites
- baixa friccao na jornada inicial
- confianca sustentada por comunicacao de curadoria tecnica
- separacao clara de expectativa entre orientacao geral e acompanhamento individual
- viabilidade operacional enxuta
- escalabilidade conscientemente adiada
- independencia de memoria persistente para o funcionamento do free

## 9. KPI e sinais de validacao

- ativacao inicial
- conclusao de sessao
- retorno para novo uso
- engajamento recorrente no piloto
- entendimento correto de que o free nao e personalizado e nao guarda evolucao
- confianca percebida
- valor percebido no treino real
- sinais de alcance, indicacao ou compartilhamento
- viabilidade operacional do piloto

## 10. Pontos de atencao para implementacao futura

### Clarificacoes ainda necessarias

- quais dados minimos sao indispensaveis para iniciar uma sessao sem parecer avaliacao profunda
- quais limites exatos definem uma "adaptacao simples"
- como o agente deve responder a perguntas fora de escopo sem soar evasivo
- qual nivel de registro operacional minimo basta para o piloto

### Riscos principais

- o usuario esperar personalizacao ou memoria e se frustrar
- a conducao passo a passo parecer lenta demais se mal executada
- a experiencia parecer chatbot generico se nao entregar utilidade pratica real
- a curadoria tecnica existir, mas nao ser percebida

## 11. Decisoes adiadas e backlog candidato

### Decisao adiada

- definir o desenho exato da observabilidade minima do piloto

### Fase futura

- arquitetura detalhada da sessao guiada
- desenho conversacional detalhado
- estrategia tecnica para curadoria e atualizacao da base de conhecimento

### Backlog candidato

- refinamento das mensagens de confianca e limite de escopo
- catalogo de adaptacoes simples permitidas
- modelo leve de registro operacional para o piloto

### Explicitamente fora de escopo na v1

- qualquer memoria persistente entre sessoes
- qualquer narrativa de acompanhamento continuo
- qualquer recurso premium ou monetizacao
- qualquer forma de coaching personalizado longitudinal

## 12. Uso por futuros agentes

Ao trabalhar neste projeto, agentes futuros devem:

- preservar a verdade da v1 descrita neste documento
- tratar sessoes independentes como restricao de produto, nao como limitacao tecnica provisoria
- marcar ideias alem desse escopo como `decisao adiada`, `fase futura`, `backlog candidato` ou `fora de escopo`
- evitar transformar a sessao guiada em entrega estatica de treino
