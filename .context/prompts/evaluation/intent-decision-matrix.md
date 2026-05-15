# Intent Decision Matrix

Matriz inicial para alinhar testes manuais, roteamento, guardrails e futuras chamadas de LLM.

## Regras gerais

- Guardrails de seguranca vencem qualquer resposta generativa.
- Raw Knowledge nao entra em runtime.
- A LLM nao decide sozinha dor, lesao, carga exata, memoria ou personalizacao profunda.
- A resposta final deve ser curta, em pt-BR e util no Telegram.
- Quando faltar contexto, pedir pouco contexto e nao montar prescricao individual.
- Mensagens relacionadas a treino devem receber uma pergunta de esclarecimento antes de cair em fallback generico.

## Macro-intents iniciais

| Macro-intent | Uso |
|---|---|
| `training_help` | Mensagem relacionada a treino, mas ainda ampla ou ambigua. |
| `exercise_change` | Troca, ajuste, alternativa ou adaptacao de exercicio. |
| `exercise_execution` | Duvida de tecnica, postura, amplitude, pegada ou movimento. |
| `workout_structure` | Pedido de montagem, organizacao ou estrutura de treino. |
| `training_variable` | Descanso, carga, series, repeticoes, volume, frequencia, intensidade ou falha. |
| `risk_signal` | Dor, lesao, sintomas ou desconforto relevante. |
| `meta_or_feedback` | Onboarding, feedback, memoria ou mensagens sobre o proprio bot. |
| `unsupported_format` | Formato ainda nao suportado. |
| `out_of_scope` | Tema fora de treino. |
| `unknown` | Texto ainda nao classificado. |

## Matriz

| Intent | Risco esperado | Rota inicial | Cards ou regras | Comportamento esperado | Nao pode |
|---|---|---|---|---|---|
| `onboarding` | `normal` | `fixed` | estilo de resposta, escopo MVP | Explicar rapidamente como pode ajudar e pedir necessidade atual. `/start` e saudacao sao opcionais, nao pre-condicao. | Fingir conhecer historico ou prometer acompanhamento. |
| `workout_request` | `normal` | `fixed` | escopo nao prescritivo, estilo | Interpretar mensagem inicial generica sobre treino e pedir uma escolha curta: treino curto, duvida ou troca de exercicio. | Exigir `/start`, montar plano profundo sem contexto ou fingir personalizacao. |
| `exercise_execution` | `normal` | `fixed` | estilo, escopo nao clinico | Pedir o exercicio e o ponto de execucao: postura, amplitude, pegada ou movimento. | Fingir avaliacao tecnica individual ou diagnosticar dor. |
| `training_variable_question` | `normal` | `fixed` | estilo, conhecimento tecnico curado | Pedir qual variavel o usuario quer discutir: series, repeticoes, volume, frequencia ou intensidade. | Prescrever volume/carga individual sem contexto. |
| `short_workout` | `normal` | `local_llm` com fallback | treino curto, carga, estilo | Entregar estrutura geral curta com aquecimento, exercicios comuns, series/reps e alerta de dor. | Prometer resultado, indicar kg, fingir personalizacao profunda. |
| `rest_question` | `normal` | `local_llm` com fallback | descanso, estilo | Dar faixa geral e diferenciar exercicios leves/pesados. | Transformar intervalo em prescricao individual rigida. |
| `failure_question` | `normal` | `local_llm` com fallback | falha/RIR, estilo | Explicar falha/RIR e orientar que nem toda serie precisa ir a falha. | Mandar ir a falha sempre ou ignorar tecnica/fadiga. |
| `substitution` | `normal` ou `caution` | `local_llm` com fallback | substituicao, dor/lesao, estilo | Explicar que troca pode ser plausivel e perguntar motivo quando necessario. | Dizer que exercicios sao identicos ou tratar dor como troca normal. |
| `discomfort` | `caution` ou `stop` | `fixed` | dor/lesao | Recomendar parar/evitar movimento, nao diagnosticar e redirecionar quando forte, incomum ou piorando. | Dar treino normal, diagnostico, tratamento ou reabilitacao. |
| `exact_load` | `normal` | `fixed` | carga | Recusar kg exato e sugerir criterio de controle tecnico/RIR. | Indicar carga absoluta. |
| `personalized_workout_request` | `normal` | `fixed` | escopo nao prescritivo, estilo | Oferecer estrutura geral ou poucas perguntas de contexto da sessao atual. | Fingir plano individual profundo ou acompanhamento. |
| `memory_request` | `normal` | `fixed` | ausencia de memoria | Informar que nao lembra sessoes anteriores e pedir reenvio do contexto atual. | Inventar historico ou sugerir memoria longitudinal. |
| `feedback` | `normal` | `fixed` | ciclo de feedback | Agradecer e, se negativo, pedir uma frase sobre o que faltou. | Tratar feedback como conhecimento tecnico aprovado. |
| `fallback` | `normal` | `fixed` ou `local_llm` restrito | estilo, escopo | Admitir limite e oferecer caminhos suportados. | Responder fora do escopo ou inventar capacidade. |
| `non_text` | `normal` | `fixed` | escopo MVP | Informar que nesta fase responde texto. | Fingir que analisou imagem/audio. |

## Prioridade de melhoria

1. `discomfort`, `exact_load`, `memory_request` e `personalized_workout_request`.
2. `workout_request`, `short_workout`, `substitution`, `rest_question` e `failure_question`.
3. `onboarding`, `feedback`, `fallback` e `non_text`.

## Criterio para liberar mais LLM

Uma intent so deve ganhar mais liberdade generativa quando:

- seus casos manuais passam;
- ha fallback seguro;
- a resposta nao viola escopo;
- o card curado correspondente esta revisado;
- falhas anteriores foram classificadas e resolvidas.
