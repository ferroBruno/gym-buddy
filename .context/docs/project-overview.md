---
type: doc
name: project-overview
description: High-level overview of the project, its purpose, and key components
category: overview
generated: 2026-04-14
status: filled
language: pt-BR
---

# Project Overview - Gym Buddy v1

## 1. Proposito

O Gym Buddy v1 existe para validar uma experiencia gratuita de orientacao de treino via WhatsApp em que um agente de IA conduz uma sessao util, clara e confiavel sem fingir personalizacao individual.

## 2. Fontes de verdade

As fontes principais desta consolidacao sao:

- [project-brief.md](./project-brief.md)
- [product-requirements-v1.md](./product-requirements-v1.md)

Se houver interpretacao ambigua, a prioridade deve ser:

1. preservar a verdade do produto declarada no brief e no PRD
2. manter o escopo da v1 enxuto
3. evitar qualquer deriva para premium, memoria entre sessoes ou coaching personalizado

## 3. Visao consolidada da v1

Gym Buddy v1 e uma experiencia `WhatsApp-first` em que um agente de IA oferece orientacao geral de treino apoiada por conhecimento curado por especialistas. O valor principal nao esta em entregar uma ficha completa, mas em conduzir uma sessao passo a passo usando apenas o contexto da conversa em andamento.

O produto busca validar:

- utilidade pratica
- clareza sobre a proposta
- confianca percebida
- retorno de uso
- potencial de alcance

## 4. Verdade operacional da v1

Esta versao e:

- gratuita
- focada em sessoes guiadas
- orientada por IA
- baseada em conhecimento curado
- geral e explicitamente nao personalizada
- limitada ao contexto da sessao atual
- sem memoria longitudinal entre sessoes

Esta versao nao e:

- coaching personalizado
- acompanhamento continuo
- prescricao individual profunda
- produto premium
- produto com monetizacao
- app proprio
- sistema desenhado para escala nesta fase

## 5. In-scope e out-of-scope

### Em escopo

- entrada simples via WhatsApp
- explicacao clara do que o servico e e do que nao e
- onboarding leve por sessao
- sessao guiada passo a passo
- adaptacoes simples dentro da sessao
- comunicacao de curadoria tecnica
- encerramento claro da sessao
- observacao leve do piloto

### Fora de escopo

- memoria entre sessoes
- evolucao historica do usuario
- atendimento humano individualizado
- premium e monetizacao
- fluxos complexos
- automacao robusta
- stack de escala

## 6. Logica principal de UX

- o usuario nao deve receber o treino inteiro no inicio
- o produto deve apresentar apenas o proximo passo relevante
- o proximo passo deve usar somente o contexto fornecido na sessao atual
- a conversa deve funcionar durante o treino real, com baixa carga cognitiva
- o encerramento deve deixar claro que a sessao terminou e que uma nova interacao sera uma nova sessao

## 7. Principais riscos de interpretacao para futuros agentes

- confundir "sessao guiada" com entrega gradual de um plano ainda excessivamente estatico
- tratar adaptacoes simples como personalizacao individual profunda
- insinuar memoria entre sessoes para melhorar a experiencia
- exagerar a analogia com personal trainer e prometer acompanhamento que a v1 nao oferece
- transformar observabilidade minima em iniciativa de dados ou plataforma

## 8. Lacunas e pontos que ainda exigem clareza

- quais perguntas minimas definem o onboarding por sessao
- quais adaptacoes simples sao permitidas sem ultrapassar o escopo
- qual e o nivel minimo aceitavel de registro operacional do piloto
- como comunicar curadoria tecnica e limites do free com mais precisao

## 9. Diretriz para proximos trabalhos

Futuros agentes devem usar este overview para orientar UX, arquitetura e implementacao, mas sempre manter:

- a sessao guiada como nucleo da experiencia
- a ausencia de memoria como restricao deliberada da v1
- a orientacao geral como limite de produto
- ideias alem disso como `decisao adiada`, `fase futura`, `backlog candidato` ou `fora de escopo`
