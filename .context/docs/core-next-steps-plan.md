---
type: doc
name: core-next-steps-plan
description: Proximos passos para evoluir o core do Gym Buddy apos estabilizacao Telegram
category: planning
generated: 2026-05-15
status: draft
language: pt-BR
---

# Core Next Steps Plan

## Objetivo

Organizar os proximos passos do Gym Buddy rumo ao core de IA: respostas melhores, mais seguras e mais consistentes a partir de conhecimento curado.

Este plano assume que Telegram, n8n e fallback operacional ja existem como base funcional, mas que a qualidade do core ainda precisa ser validada por avaliacao estruturada.

## Direcao

O proximo marco nao e adicionar mais infraestrutura. O proximo marco e tornar o core avaliavel.

Prioridade:

1. Casos de avaliacao.
2. Matriz de decisao por intent.
3. Ciclo de feedback.
4. Ajustes pequenos em cards, prompts e roteador.
5. Comparacao rule-based vs Ollama.

## Marco 1 - Avaliacao fundacional

Entregaveis:

- casos manuais em `.context/prompts/evaluation/mvp-manual-test-cases.md`;
- matriz em `.context/prompts/evaluation/intent-decision-matrix.md`;
- template de registro em `.context/prompts/evaluation/llm-feedback-test-log-template.md`.

Criterio de pronto:

- cada intent prioritaria tem pelo menos um caso;
- cada caso tem criterio de aceite;
- falhas podem ser classificadas com categoria padrao;
- casos de seguranca passam antes de ampliar LLM.

## Marco 2 - Prompt pack revisavel

Entregaveis futuros:

- system prompt consolidado;
- cards curados usados por intent;
- fallback text por intent;
- response style unico.

Criterio de pronto:

- nao ha divergencia relevante entre arquivos curados e cards inline do workflow;
- cada texto usado pelo workflow tem fonte revisavel em `.context/`;
- alteracoes de prompt podem ser revisadas por diff.

## Marco 3 - Teste comparativo rule-based vs Ollama

Entregaveis futuros:

- lote pequeno de casos executado com LLM disponivel;
- resultado comparando resposta fixa, resposta LLM e fallback;
- lista de ajustes recomendados.

Criterio de pronto:

- LLM melhora clareza ou utilidade sem violar guardrails;
- fallback continua seguro;
- erros do Ollama nao quebram resposta no Telegram.

## Marco 4 - Refinamento incremental do core

Possiveis ajustes:

- melhorar palavras-chave de roteamento;
- dividir intents ambiguas;
- ajustar cards curados compactos;
- encurtar respostas;
- melhorar perguntas de esclarecimento;
- reforcar guardrails sensiveis.

Limites:

- nao criar memoria longitudinal;
- nao criar prescricao individual profunda;
- nao usar Raw Knowledge diretamente;
- nao criar RAG, embeddings ou banco vetorial nesta fase.

## Marco 5 - Decisao de escala

Somente depois dos marcos anteriores, decidir se vale:

- automatizar testes;
- persistir resultados estruturados;
- criar catalogo curado em Postgres;
- usar avaliador LLM;
- estudar RAG ou embeddings;
- ampliar intents.

## Proxima acao recomendada

Executar manualmente o primeiro lote de avaliacao no Telegram e registrar resultados com o template de feedback. As primeiras melhorias devem vir dos casos que falharem, nao de expansao teorica do conhecimento.

