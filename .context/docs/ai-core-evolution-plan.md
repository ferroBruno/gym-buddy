---
type: doc
name: ai-core-evolution-plan
description: Plano de evolucao do core de IA do Gym Buddy
category: planning
generated: 2026-05-14
status: draft
language: pt-BR
---

# AI Core Evolution Plan

## Direcao

O valor do Gym Buddy esta no core de IA, nao no canal de mensageria.

Telegram, n8n, tunnel e logs sao infraestrutura de execucao. O core deve entregar orientacao simples, segura e acessivel para pessoas na academia.

## Arquitetura alvo

O core deve separar decisao tecnica de geracao de linguagem.

Fluxo alvo:

1. Receber mensagem.
2. Normalizar texto.
3. Classificar:
   - `intent`;
   - `risk_level`;
   - `requires_llm`;
   - `fallback_reason`.
4. Decidir rota:
   - resposta fixa segura;
   - LLM local via Ollama;
   - fallback rule-based se LLM falhar;
   - feedback sem LLM.
5. Registrar log tecnico.
6. Responder no Telegram.

## Intents prioritarias

- `onboarding`;
- `short_workout`;
- `rest_question`;
- `failure_question`;
- `substitution`;
- `discomfort`;
- `exact_load`;
- `personalized_workout_request`;
- `memory_request`;
- `feedback`;
- `fallback`.

## Politica de custo zero

Enquanto nao houver budget, o MVP deve funcionar sem depender de API paga.

Prioridade:

1. Rule-based para intents conhecidas.
2. Ollama local como camada de melhoria quando disponivel.
3. API paga apenas como opcional futura.

## Papel do rule-based

O rule-based nao e o produto final. Ele existe para:

- validar canal e fluxo;
- impedir silencio quando o LLM falha;
- testar linguagem e utilidade basica;
- proteger guardrails de dor, lesao, carga absoluta e memoria;
- gerar logs para entender demanda real.

## Papel do Ollama

O Ollama deve entrar como LLM local para melhorar respostas dentro das fronteiras do core.

Regras:

- nao substituir guardrails;
- nao decidir sozinho casos de dor ou risco;
- nao criar memoria longitudinal;
- nao consultar RAG, embeddings ou Google Drive nesta etapa;
- receber intent e risk_level ja classificados pelo roteador;
- responder curto em pt-BR.

## Criterio para ativar Ollama

Ativar Ollama quando:

- o modelo local responder em tempo aceitavel;
- o n8n conseguir chamar o endpoint local de forma estavel;
- houver fallback rule-based caso o modelo esteja offline;
- os casos manuais continuarem passando.

## Validacao minima

Cada mensagem deve permitir verificar:

- se chegou ao n8n;
- qual intent foi detectada;
- se chamou LLM;
- se o LLM respondeu ou falhou;
- qual fallback foi usado;
- qual resposta foi enviada.

## Proximos marcos

1. MVP sem custo: intents conhecidas respondem via rule-based.
2. Ollama local opcional: node de LLM local para intent `fallback` e refinamento de respostas. Iniciado no workflow MVP.
3. Avaliacao comparativa: rule-based vs Ollama nos casos manuais.
4. Curadoria de conhecimento: transformar material bruto em playbooks revisados.
5. Memoria explicita e consentida, somente apos estabilizar qualidade e seguranca.
