---
type: doc
name: core-agent-plan
description: Implementation plan for the Gym Buddy agent core
category: planning
generated: 2026-05-13
status: draft
language: pt-BR
---

# Core Agent Plan - Gym Buddy

## Objetivo

Evoluir o prototipo atual de um bot funcional no Telegram para um agente conversacional de apoio pratico ao treino.

O core inicial deve permanecer dentro da arquitetura simples atual: n8n + Postgres, com prompts e playbooks versionados em `.context/`.

## Decisao tecnica inicial

Usar o n8n como orquestrador do core nesta fase.

Nao criar ainda:

- backend proprio;
- Fastify;
- Redis;
- banco vetorial;
- Supabase;
- sincronizacao automatica com Google Drive.

## Fronteira do core MVP

O core recebe:

- canal;
- `chat_id`;
- texto da mensagem;
- timestamp;
- metadados tecnicos minimos.

O core retorna:

- texto de resposta;
- intencao detectada;
- nivel de risco;
- indicacao se deve pedir esclarecimento;
- indicacao se deve interromper ou redirecionar.

## Contrato de entrada

```json
{
  "channel": "telegram",
  "chatId": "string",
  "messageText": "string",
  "messageType": "text",
  "receivedAt": "ISO timestamp"
}
```

## Contrato de saida

```json
{
  "replyText": "string",
  "intent": "onboarding | workout_request | exercise_question | substitution | discomfort | concept_explanation | fallback",
  "riskLevel": "normal | caution | stop",
  "needsClarification": false,
  "shouldPersist": false
}
```

## Intentions iniciais

- `onboarding`: primeiro contato ou `/start`.
- `workout_request`: usuario pede treino.
- `exercise_question`: duvida sobre execucao ou conceito.
- `substitution`: usuario quer trocar exercicio.
- `discomfort`: dor, desconforto ou sinal de risco.
- `concept_explanation`: explicacao curta de conceito.
- `fallback`: mensagem vaga ou fora de escopo.

## Etapas recomendadas

1. Criar prompts e playbooks versionados.
2. Criar casos de avaliacao.
3. Criar um workflow `020-gym-buddy-core-smoke`. Concluido.
4. Conectar o workflow Telegram echo ao core smoke.
5. Testar com mensagens reais pelo telefone.
6. Refinar guardrails antes de ampliar conhecimento tecnico.

## Nao objetivos desta fase

- Personalizacao longitudinal.
- Prescricao clinica.
- Diagnostico de lesao.
- Memoria permanente de usuario.
- Analise automatica de imagem.
- Montagem de treino altamente individualizada.

## Criterio de pronto

O core MVP esta pronto quando:

- responde corretamente aos casos de avaliacao minimos;
- nao extrapola em cenarios de dor ou risco;
- pede esclarecimento quando faltam dados;
- gera respostas curtas e acionaveis;
- funciona pelo Telegram com workflow versionado;
- nao versiona segredos ou dados reais.
