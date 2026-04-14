---
type: doc
name: testing-strategy
description: Testing strategy and quality baseline for Gym Buddy v1
category: testing
generated: 2026-04-14
status: filled
language: pt-BR
---

# Testing Strategy - Gym Buddy v1

## 1. Objetivo

Este documento define como o Gym Buddy v1 deve ser validado antes e durante a implementacao. O foco e proteger o escopo da v1, validar o comportamento da sessao guiada no WhatsApp e evitar que a solucao derive para memoria persistente, coaching personalizado ou complexidade excessiva.

## 2. Guardrails obrigatorios

Toda estrategia de teste deve preservar que Gym Buddy v1 e:

- exclusivamente free
- `WhatsApp-first`
- conduzido por agente de IA
- orientacao geral e nao personalizada
- sustentado por base curada por especialistas
- centrado em sessoes guiadas passo a passo
- limitado ao contexto da sessao atual
- sem memoria funcional entre sessoes
- sem premium, monetizacao ou personalizacao longitudinal

Regras de qualidade derivadas:

- `Redis` pode guardar apenas estado ativo e efemero da sessao
- `Supabase Postgres` pode guardar apenas dados operacionais persistentes
- nenhum teste pode aceitar continuidade funcional entre sessoes no free
- o sistema nao pode entregar o treino inteiro de uma vez
- o sistema nao pode se comportar como coaching individualizado

## 3. Principais riscos de qualidade

### 3.1 Riscos de produto

- o produto parecer um chatbot generico ou ficha estatica em vez de sessao guiada
- o usuario interpretar a experiencia como coaching personalizado
- a curadoria tecnica nao aparecer nos momentos de confianca mais importantes

### 3.2 Riscos de comportamento da sessao

- o sistema despejar o treino inteiro em vez de progredir passo a passo
- o contexto da sessao atual ser insuficiente ou mal usado
- o encerramento sugerir continuidade ou progresso salvo

### 3.3 Riscos de implementacao

- `Redis` sobreviver alem do papel de estado efemero
- `Supabase Postgres` ser reutilizado como memoria escondida
- o LLM dominar a orquestracao e ignorar regras de sessao e de escopo

### 3.4 Riscos de confianca e escopo

- mensagens inconsistentes sobre IA, orientacao geral e ausencia de memoria
- respostas fora de escopo parecerem especializadas demais
- o sistema insinuar premium, continuidade ou historico de treino

## 4. Camadas de teste recomendadas

### 4.1 Unit tests

Cobrir:

- transicoes de estado da sessao
- selecao do proximo passo
- guardrails de escopo
- montagem de mensagens
- selecao de conhecimento curado
- adaptadores de persistencia e configuracao de TTL

### 4.2 Integration tests

Cobrir:

- webhook do WhatsApp para orquestrador
- orquestrador para `Redis`
- orquestrador para `Supabase Postgres`
- orquestrador para camada de conhecimento
- orquestrador para LLM e tool/function calling

### 4.3 Contract and API tests

Cobrir:

- contrato de webhook do WhatsApp
- parsing e normalizacao de mensagens
- formato de mensagem de saida
- contrato de tool/function calling do LLM
- contrato de schema de eventos operacionais

### 4.4 Session-flow tests

Cobrir:

- sessao guiada ponta a ponta
- pouco tempo
- equipamento indisponivel
- pergunta fora de escopo
- encerramento de sessao
- nova sessao sem memoria

### 4.5 Conversation behavior tests

Cobrir:

- tom e clareza
- uma acao principal por mensagem
- passo a passo real
- mensagens de confianca e expectativa
- ausencia de linguagem que implique historico ou personalizacao

### 4.6 Regression tests

Cobrir regressao contra:

- entrega do treino completo de uma vez
- uso de contexto de sessao anterior
- premium drift
- pseudo-personalizacao
- mensagens fracas de limite de escopo

### 4.7 Manual pilot validation

Usar validacao manual leve para:

- smoke tests no canal real do WhatsApp
- revisao humana de clareza e pacing
- revisao de respostas fora de escopo
- verificacao manual de fluxos centrais antes do piloto

## 5. O que deve ser testado

No minimo, a estrategia deve cobrir:

- inicio da sessao
- onboarding leve
- progressao passo a passo
- logica do proximo passo
- adaptacoes em sessao
- encerramento
- nova sessao sem continuidade historica
- perguntas fora de escopo
- comportamento explicitamente nao personalizado
- ausencia de memoria entre sessoes
- mensagens de confianca e expectativa

## 6. Abordagem por componente

### 6.1 Camada WhatsApp

Testar:

- verificacao do webhook
- parsing de payload
- formatacao de mensagens de saida
- idempotencia em eventos repetidos
- tratamento basico de retry e falhas

### 6.2 Orquestracao conversacional

Testar:

- abertura da sessao
- onboarding minimo
- decisao do proximo passo
- adaptacoes simples
- reconducao apos pergunta fora de escopo
- encerramento claro

### 6.3 Estado ativo em `Redis`

Testar:

- criacao do estado da sessao
- TTL
- expiracao
- reset no encerramento
- isolamento entre sessoes

### 6.4 Persistencia operacional em `Supabase Postgres`

Testar:

- escrita de eventos operacionais
- schema minimo de sessao, friccao e sinais do piloto
- impossibilidade de leitura desses dados como memoria de produto
- ausencia de qualquer efeito desses dados sobre sessoes futuras

### 6.5 Uso da base curada

Testar:

- selecao do bloco de conhecimento correto
- aderencia a regras de escopo
- consistencia tecnica da orientacao
- inexistencia de conteudo fora do escopo da v1

### 6.6 Limites de comportamento do LLM

Testar:

- respeito ao papel de formulacao, nao de controle da sessao
- obediencia a guardrails
- recusas e redirecionamentos para fora de escopo
- ausencia de linguagem de memoria, historico ou coaching individual

## 7. Testes negativos criticos

### 7.1 Whole-workout dump

Falha a bloquear:

- o sistema envia o treino inteiro logo no inicio
- o sistema perde a estrutura de feedback e proximo passo

### 7.2 Personalization drift

Falha a bloquear:

- o sistema usa linguagem como "com base no seu historico"
- o sistema responde como se fizesse avaliacao individual profunda

### 7.3 Cross-session memory

Falha a bloquear:

- nova sessao reaproveita preferencias, progresso ou contexto anterior
- `Redis` ou `Supabase Postgres` alimentam continuidade funcional

### 7.4 Premium drift

Falha a bloquear:

- linguagem de upsell
- insinuacao de coaching pago
- discurso que torne o free deliberadamente incompleto

### 7.5 Weak boundary messaging

Falha a bloquear:

- respostas fora de escopo vagas ou contraditorias
- ausencia de explicacao de que a orientacao e geral
- falta de clareza sobre ausencia de memoria entre sessoes

## 8. Scripts manuais de validacao

### 8.1 Sessao guiada

1. Iniciar conversa nova no WhatsApp.
2. Verificar apresentacao curta com IA, orientacao geral e sem memoria entre sessoes.
3. Entrar no onboarding leve.
4. Verificar recebimento de um passo por vez.
5. Seguir ate encerramento claro.

### 8.2 Pouco tempo

1. Iniciar sessao.
2. Informar que ha pouco tempo.
3. Verificar adaptacao curta sem personalizacao.
4. Confirmar que a sessao continua coerente e fecha claramente.

### 8.3 Equipamento indisponivel

1. Iniciar sessao.
2. Informar indisponibilidade de equipamento.
3. Verificar substituicao simples.
4. Confirmar que o fluxo segue dentro do escopo free.

### 8.4 Fora de escopo

1. Pedir ajuste individualizado ou historico.
2. Verificar limite claro do free.
3. Confirmar resposta apenas em nivel geral permitido.
4. Verificar reconducao para a sessao atual.

### 8.5 Nova sessao sem memoria

1. Concluir uma sessao.
2. Iniciar nova conversa depois.
3. Verificar ausencia de progresso, preferencias ou historico.
4. Confirmar reentrada como nova sessao.

## 9. Estrategia de criterios de aceitacao

### 9.1 Pronto para validacao interna

- fluxo central da sessao funciona em ambiente controlado
- nenhum teste consegue reconstruir continuidade entre sessoes
- mensagens de limite e confianca estao consistentes
- o sistema ainda parece sessao guiada, nao ficha estatica

### 9.2 Pronto para piloto

- sessao completa funciona ponta a ponta no WhatsApp
- `Redis` expira e isola corretamente
- `Supabase Postgres` e apenas operacional
- testes negativos de memoria, premium e personalizacao passam
- scripts manuais centrais passam sem ambiguidade relevante

### 9.3 Pronto para teste com usuarios limitados

- usuarios conseguem entender que o produto e geral e nao personalizado
- retorno em outro momento e tratado como nova sessao
- sinais operacionais do piloto podem ser observados
- nao ha confusao material sobre memoria, progresso salvo ou coaching

## 10. Quality gates

### 10.1 Antes de codar

Deve existir:

- alinhamento entre PRD, UX, arquitetura, tooling e plano de implementacao
- estrategia de teste documentada
- scripts manuais essenciais definidos
- limites explicitos entre `Redis` e `Supabase Postgres`
- lista de testes negativos criticos

### 10.2 Antes do piloto

Deve passar:

- fluxo ponta a ponta da sessao
- isolamento entre sessoes
- expiracao de `Redis`
- persistencia operacional sem memoria em `Supabase Postgres`
- regressao contra personalizacao, premium e whole-workout dump
- validacao manual dos fluxos centrais

### 10.3 Durante o piloto

Deve ser acompanhado:

- inicio e encerramento de sessao
- acionamento de adaptacoes
- perguntas fora de escopo recorrentes
- sinais de friccao
- sinais de valor percebido
- confusoes sobre memoria, escopo ou personalizacao

## 11. O que pode continuar manual na v1

- smoke tests no sandbox/ambiente real do WhatsApp
- revisao de tom, clareza e pacing
- sanity check da base curada
- inspecao inicial de logs e eventos operacionais
- leitura humana de conversas do piloto para detectar confusoes

## 12. Fora de escopo da estrategia de teste v1

- cobertura de premium, billing ou monetizacao
- testes de memoria persistente entre sessoes
- testes de personalizacao longitudinal
- testes de escala pesada
- dashboards e analytics sofisticados
- automacao de QA excessiva antes da validacao do produto
