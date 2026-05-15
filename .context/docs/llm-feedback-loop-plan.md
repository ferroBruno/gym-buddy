---
type: doc
name: llm-feedback-loop-plan
description: Plano para transformar testes manuais do Gym Buddy em ciclo de melhoria da LLM
category: planning
generated: 2026-05-15
status: draft
language: pt-BR
---

# LLM Feedback Loop Plan

## Objetivo

Criar um ciclo simples para que os primeiros testes manuais do Gym Buddy validem o MVP atual e tambem gerem sinal util para melhorar prompts, cards curados, playbooks e uso futuro da LLM.

Este plano nao cria RAG, embeddings, banco vetorial, novas tabelas, sincronizacao com Google Drive, memoria longitudinal ou treinamento/fine-tuning de modelo.

## Principio central

Os testes devem avaliar comportamento observavel, nao apenas se houve resposta.

Cada teste precisa registrar:

- mensagem enviada;
- intent esperada;
- risco esperado;
- rota esperada;
- resposta recebida;
- criterio de aceite;
- falha observada, quando existir;
- ajuste recomendado.

## Papel no MVP atual

No MVP atual, o ciclo serve para:

- confirmar se o roteador classifica corretamente intents e riscos;
- verificar se guardrails bloqueiam casos sensiveis;
- comparar resposta fixa, resposta via Ollama e fallback;
- identificar respostas longas, vagas, inseguras ou pouco uteis;
- decidir qual card curado, playbook ou prompt precisa ajuste.

## Papel futuro para a LLM

Quando o uso da LLM amadurecer, os mesmos registros devem orientar:

- melhoria do system prompt;
- ajuste dos cards curados injetados no prompt;
- criacao de exemplos bons e ruins;
- refinamento de criterios de aceitacao por intent;
- escolha de quais intents continuam rule-based;
- decisao sobre quando uma intent pode chamar LLM com seguranca.

## Unidade minima de avaliacao

Cada caso deve conter:

| Campo | Uso |
|---|---|
| `case_id` | Identificador estavel do teste. |
| `user_message` | Mensagem enviada pelo Telegram ou webhook de teste. |
| `expected_intent` | Intent que o roteador deveria detectar. |
| `expected_risk_level` | `normal`, `caution` ou `stop`. |
| `expected_route` | `fixed`, `local_llm` ou fallback controlado. |
| `must_include` | Elementos que a resposta deve conter. |
| `must_not_include` | Elementos proibidos. |
| `acceptance` | Criterio curto de aprovado/reprovado. |
| `observed_reply` | Resposta real observada no teste. |
| `failure_type` | Categoria da falha, se houver. |
| `recommended_change` | Ajuste proposto. |

## Tipos de falha

Use categorias pequenas e repetiveis:

- `intent_mismatch`: intent detectada incorretamente.
- `risk_mismatch`: risco detectado incorretamente.
- `unsafe_reply`: resposta viola guardrail.
- `over_personalization`: resposta finge personalizacao profunda.
- `memory_claim`: resposta sugere memoria entre sessoes.
- `absolute_load`: resposta indica kg exato.
- `too_long`: resposta longa demais para Telegram.
- `too_vague`: resposta nao entrega proximo passo util.
- `llm_error`: chamada LLM falhou.
- `fallback_bad`: fallback nao foi util ou seguro.
- `content_gap`: falta card, playbook ou regra curada.

## Acao recomendada por falha

| Falha | Ajuste preferencial |
|---|---|
| `intent_mismatch` | Ajustar roteador ou exemplos de classificacao. |
| `risk_mismatch` | Ajustar guardrail e palavras-chave de risco. |
| `unsafe_reply` | Corrigir guardrail antes de mexer em estilo. |
| `over_personalization` | Reforcar escopo nao prescritivo. |
| `memory_claim` | Reforcar ausencia de memoria longitudinal. |
| `absolute_load` | Reforcar card de carga e fallback fixo. |
| `too_long` | Ajustar response generation. |
| `too_vague` | Ajustar playbook ou card tecnico. |
| `llm_error` | Validar Ollama e fallback. |
| `fallback_bad` | Melhorar resposta rule-based correspondente. |
| `content_gap` | Criar ou revisar card curado antes de ampliar LLM. |

## Ciclo operacional

1. Selecionar lote pequeno de casos em `.context/prompts/evaluation/`.
2. Executar manualmente no Telegram ou em workflow smoke.
3. Registrar resposta observada e logs tecnicos.
4. Classificar falhas com as categorias acima.
5. Fazer ajuste minimo em prompt, card, playbook, roteador ou fallback.
6. Reexecutar apenas os casos afetados.
7. Registrar decisao e manter rastreabilidade.

## Criterio para promover melhoria

Uma melhoria so deve ser considerada pronta quando:

- nao quebra guardrails de dor, lesao, carga, memoria e personalizacao;
- melhora pelo menos um caso falho;
- nao piora casos sensiveis ja aprovados;
- mantem respostas curtas e praticas;
- preserva Raw Knowledge fora do runtime.

## Decisoes adiadas

- Automatizar execucao dos casos.
- Criar banco de resultados historicos.
- Usar avaliador LLM automatico.
- Usar RAG, embeddings ou busca em documentos.
- Criar memoria por usuario.
- Fazer fine-tuning.

