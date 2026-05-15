---
type: doc
name: core-coverage-hypotheses
description: Hipoteses para reduzir fallback e ampliar cobertura conversacional do Gym Buddy
category: planning
generated: 2026-05-15
status: draft
language: pt-BR
---

# Core Coverage Hypotheses

## Objetivo

Reduzir a frequencia da resposta generica de fallback sem enfraquecer guardrails de seguranca, escopo e ausencia de memoria longitudinal.

O foco nao e fazer o bot responder qualquer coisa. O foco e interpretar melhor mensagens reais sobre treino e responder com o melhor proximo passo seguro.

## Diagnostico atual

O MVP esta funcional, mas ainda depende de palavras-chave muito explicitas.

Consequencias:

- mensagens validas com vocabulario diferente caem em fallback;
- pedidos de continuidade, como "muda o exercicio 2", ainda exigem contexto que o MVP nao tem;
- perguntas abertas sobre treino podem nao ser classificadas;
- o bot parece rigido, mesmo quando poderia pedir esclarecimento curto;
- o fallback aparece antes de tentar uma interpretacao util.

## Hipotese 1 - Fallback deve virar pergunta de esclarecimento

Trocar a postura padrao de "nao consigo responder" por uma pergunta curta quando a mensagem parece relacionada a treino.

Exemplo:

```text
Entendi que voce quer ajustar algo do treino. Voce quer trocar exercicio, tirar uma duvida de execucao ou montar uma opcao curta para hoje?
```

Criterio de sucesso:

- menos fallbacks secos;
- mais mensagens redirecionadas para intents conhecidas;
- sem fingir que entendeu contexto ausente.

## Hipotese 2 - Criar macro-intents antes de intents finas

Em vez de tentar prever todas as frases, classificar primeiro em grupos amplos:

- `training_help`: pedido geral sobre treino;
- `exercise_change`: troca, ajuste ou alternativa;
- `exercise_execution`: duvida de execucao;
- `workout_structure`: montagem ou organizacao de treino;
- `training_variable`: descanso, carga, series, repeticoes, falha;
- `risk_signal`: dor, lesao, tontura, sintomas;
- `meta_or_feedback`: feedback, limite, reclamacao, agradecimento;
- `out_of_scope`: temas fora de treino.

Depois, o core decide se responde, pergunta algo ou bloqueia.

Criterio de sucesso:

- menos dependencia de palavras-chave exatas;
- melhor reaproveitamento dos mesmos guardrails;
- logs mais uteis para evoluir a matriz de decisao.

## Hipotese 3 - Usar LLM como classificador restrito

Manter regras fixas para risco alto, mas permitir que a LLM classifique mensagens normais em uma lista fechada de intents.

Entrada para a LLM:

- mensagem do usuario;
- lista fechada de intents permitidas;
- regras de saida JSON;
- instrucao para nao responder ao usuario nessa etapa.

Saida esperada:

```json
{
  "intent": "exercise_change",
  "confidence": "medium",
  "risk_level": "normal",
  "needs_clarification": true
}
```

Criterio de sucesso:

- aumenta cobertura sem liberar geracao direta;
- mensagens ambiguas viram esclarecimento;
- casos de dor continuam bloqueados antes ou depois da classificacao.

## Hipotese 4 - Criar playbooks de esclarecimento

Nem toda mensagem precisa de resposta tecnica. Muitas precisam de uma pergunta curta.

Playbooks prioritarios:

- pedido generico de treino;
- troca de exercicio sem contexto;
- duvida de execucao sem nome do exercicio;
- pedido de ajuste de "exercicio 2" sem treino anterior;
- objetivo amplo como hipertrofia, emagrecimento ou condicionamento;
- falta de equipamento;
- pouco tempo disponivel.

Criterio de sucesso:

- bot conversa melhor sem memoria;
- usuario entende o que precisa informar;
- menos respostas longas e menos prescricao indevida.

## Hipotese 5 - Expandir vocabulario por tema

Criar listas pequenas de sinonimos e padroes por macro-intent.

Exemplos:

- troca: trocar, mudar, substituir, adaptar, alternativa, no lugar de;
- treino curto: rapido, hoje, agora, pouco tempo, meia hora, 20 minutos;
- execucao: como fazer, postura, tecnica, movimento, amplitude;
- variaveis: descanso, intervalo, carga, peso, repeticoes, series, falha;
- risco: dor, fisgada, formigamento, tontura, peito, piorando.

Criterio de sucesso:

- melhora imediata do roteador rule-based;
- baixo risco operacional;
- facil de revisar por diff.

## Hipotese 6 - Separar fallback por categoria

Substituir um fallback unico por respostas especificas:

- `fallback_training_related`: parece treino, mas falta contexto;
- `fallback_unsupported_format`: imagem, audio ou arquivo;
- `fallback_out_of_scope`: tema fora de treino;
- `fallback_llm_error`: LLM falhou;
- `fallback_low_confidence`: nao entendeu com confianca.

Criterio de sucesso:

- usuario recebe orientacao mais util;
- logs mostram onde o core falha;
- melhorias futuras ficam mais direcionadas.

## Hipotese 7 - Registrar frases que caem em fallback

Usar os logs tecnicos do n8n para coletar exemplos sanitizados de mensagens que caem em fallback.

Campos minimos:

- mensagem sanitizada;
- fallback usado;
- intent que deveria ter sido detectada;
- ajuste recomendado;
- decisao: ampliar roteador, criar playbook, criar card ou manter fora de escopo.

Criterio de sucesso:

- evolucao guiada por uso real;
- menos adivinhacao;
- melhora incremental de cobertura.

## Ordem recomendada

1. Trocar fallback generico por pergunta de esclarecimento quando a mensagem parecer treino. Iniciado no workflow `030`.
2. Criar macro-intents e fallbacks categorizados. Iniciado no workflow `030`.
3. Expandir vocabulario rule-based por tema. Iniciado de forma limitada no workflow `030`.
4. Criar playbooks de esclarecimento.
5. Testar LLM como classificador restrito.
6. Comparar fallback antes/depois com casos manuais e logs reais.

## Implementacao inicial no workflow 030

O workflow `030-gym-buddy-mvp-telegram` agora registra `macro_intent` alem de `intent`.

Macro-intents iniciais:

- `training_help`;
- `exercise_change`;
- `exercise_execution`;
- `workout_structure`;
- `training_variable`;
- `risk_signal`;
- `meta_or_feedback`;
- `unsupported_format`;
- `out_of_scope`;
- `unknown`.

Fallbacks categorizados iniciais:

- `fallback_training_related`;
- `fallback_unsupported_format`;
- `fallback_out_of_scope`;
- `fallback_low_confidence`;
- `needs_session_context`;
- `needs_exercise_context`;
- `needs_variable_context`;

O objetivo desta primeira implementacao e reduzir respostas secas de incapacidade e direcionar o usuario para uma escolha curta quando o texto parecer relacionado a treino.

## Limites preservados

- Dor e risco continuam com resposta fixa segura.
- Carga exata continua bloqueada.
- Memoria longitudinal continua fora do MVP.
- Raw Knowledge continua fora do runtime.
- LLM nao decide conduta clinica, prescricao individual ou historico do usuario.
