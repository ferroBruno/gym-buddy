---
type: doc
name: knowledge-conversion-map
description: Map for converting raw Gym Buddy knowledge into reviewed operational artifacts
category: knowledge
generated: 2026-05-13
status: draft
language: pt-BR
---

# Knowledge Conversion Map - Gym Buddy

## 1. Objetivo

Definir como materiais brutos podem ser transformados em artefatos operacionais do Gym Buddy sem permitir que Raw Knowledge seja consultada diretamente no atendimento ao usuario.

Este mapa orienta a passagem entre base bruta, conhecimento curado, guardrails, playbooks, templates de resposta e avaliacao.

## 2. Regra central

Raw Knowledge nunca deve ser usado diretamente no atendimento ao usuario.

Todo conteudo bruto deve ser revisado, consolidado e convertido para uma camada curada antes de influenciar o comportamento do agente.

## 3. Mapa de conversao

| Tipo de conteudo encontrado | Destino recomendado | Exemplo de artefato gerado | Observacao |
|---|---|---|---|
| Estudo sobre volume de treino | Curated Technical Knowledge | `volume-intensidade-frequencia.md` | Consolidar em linguagem operacional |
| Regra sobre dor ou lesao | Behavioral & Safety Guardrails | `dor-e-sinais-de-risco.md` | Prioridade alta |
| Duvidas frequentes de alunos | Session Playbooks | `substituicao-de-exercicio.md` | Converter em fluxo de resposta |
| Exemplos de resposta curta | Response Generation | `response-patterns.md` | Preservar tom objetivo e aplicavel |
| Respostas boas/ruins | Evaluation | `casos-de-teste.md` | Usar para validacao |
| Promessas de resultado | Nao usar diretamente | Registrar risco | Pode violar escopo |
| Conteudo clinico | Guardrail ou fora de escopo | `redirecionamento-clinico.md` | Nao virar orientacao direta |
| Fichas completas de treino | Session Playbooks ou Evaluation | `treino-sem-ficha.md` / casos de teste | Nao transformar em prescricao individual |

## 4. Conversao para Curated Technical Knowledge

Use esta camada para consolidar conhecimento tecnico geral sobre hipertrofia, volume, intensidade, frequencia, descanso, progressao, proximidade da falha, selecao de exercicios, substituicoes e execucao geral.

Regras de conversao:

- escrever em linguagem geral e operacional;
- remover detalhes que dependam de avaliacao individual;
- registrar limites, excecoes e incertezas;
- preservar o foco em hipertrofia geral;
- evitar promessas de resultado;
- referenciar a origem no registro de auditoria.

Conteudo tecnico curado nao deve virar ficha individual. Ele deve apoiar decisoes gerais de playbook e respostas curtas.

## 5. Conversao para Behavioral & Safety Guardrails

Use esta camada para conteudos que definem limites do agente.

Devem virar guardrails:

- dor, lesao, desconforto relevante ou piora durante exercicio;
- suspeita de condicao clinica;
- reabilitacao;
- medicacao, suplemento ou conduta de saude;
- pedidos de prescricao individual profunda;
- pedidos de carga absoluta ou progressao altamente especifica;
- promessas de ganho ou transformacao corporal.

Guardrails devem dizer o que o agente deve fazer, o que nao deve fazer e quando redirecionar para profissional qualificado.

## 6. Conversao para Session Playbooks

Use esta camada para transformar temas recorrentes em fluxo de conversa.

Exemplos:

- onboarding leve por sessao;
- pedido de treino;
- substituicao por equipamento indisponivel;
- duvida de execucao;
- treino curto;
- desconforto durante a sessao;
- explicacao simples de conceito.

O playbook deve preservar a logica de sessao guiada: quando o usuario pedir um treino, o agente deve conduzir o proximo passo util, nao despejar uma ficha completa como se fosse prescricao individual.

## 7. Conversao para Response Generation

Use esta camada para padroes de resposta, tom, formato e exemplos.

Regras:

- respostas curtas e acionaveis;
- um proximo passo claro por vez quando a sessao estiver em andamento;
- linguagem simples para uso durante o treino;
- limites explicitos quando o pedido sair do escopo;
- sem afirmar acompanhamento longitudinal;
- sem simular papel de personal trainer, medico ou fisioterapeuta.

Exemplos brutos de resposta so podem entrar aqui depois de revisao de escopo, seguranca e consistencia.

## 8. Conversao para Evaluation

Use esta camada para validar comportamento do agente.

Podem virar avaliacao:

- perguntas frequentes reais;
- exemplos de boas respostas;
- exemplos de respostas ruins;
- cenarios de dor ou risco;
- pedidos de treino completo;
- pedidos de personalizacao indevida;
- casos de troca de exercicio;
- casos de mensagem vaga.

Cada caso deve declarar entrada, comportamento esperado, riscos e criterio de aceite.

## 9. Conteudos que nao devem ser convertidos

Nao converter para comportamento operacional direto:

- conteudo clinico sem revisao especializada;
- promessas de resultado;
- protocolos de reabilitacao;
- orientacao sobre medicacao;
- prescricoes individuais completas;
- fichas completas ligadas a uma pessoa real;
- historicos que induzam memoria longitudinal;
- dados pessoais ou sensiveis;
- materiais sem origem confiavel quando o risco for medio ou alto.

Esses materiais podem permanecer como Raw Knowledge, gerar registro de risco ou motivar guardrails.

## 10. Criterios minimos para promover conteudo

Antes de promover conteudo, confirme:

- a origem esta registrada;
- a camada de destino esta clara;
- o risco de uso direto foi avaliado;
- flags sensiveis foram verificadas;
- a conversao preserva orientacao geral;
- a conversao nao cria memoria entre sessoes;
- a conversao nao cria prescricao individual;
- a conversao apoia sessao guiada passo a passo;
- a revisao humana foi feita ou marcada como obrigatoria.

## 11. Riscos de conversao indevida

Conversao indevida pode:

- transformar referencia bruta em conselho inseguro;
- fazer o agente parecer personal trainer;
- induzir diagnostico ou reabilitacao;
- gerar promessa de resultado;
- criar ficha completa imediata;
- sugerir continuidade entre sessoes;
- misturar opinioes contraditorias como se fossem regra oficial;
- expor dados sensiveis ou segredos.

Quando houver duvida, manter como Raw Knowledge e registrar decisao pendente.

## 12. Relacao com sessao guiada

A arquitetura de conhecimento deve servir a uma experiencia conduzida durante o treino.

Consequencias praticas:

- o agente entrega o proximo passo relevante;
- o agente pede esclarecimento quando faltar contexto da sessao atual;
- o agente evita fichas extensas como resposta inicial;
- o agente adapta apenas de forma simples e dentro da sessao;
- o agente encerra a sessao de forma clara quando apropriado.

Conteudos de treino completos podem ajudar a criar playbooks ou casos de avaliacao, mas nao devem virar prescricao individual entregue diretamente.

## 13. Relacao com ausencia de memoria longitudinal

Nenhuma conversao deve depender de historico persistente do usuario.

O agente pode usar apenas o contexto da sessao atual. Materiais que incentivem acompanhamento continuo, progresso acumulado, perfil permanente ou preferencia historica devem ser classificados como risco ou fase futura, nao como comportamento atual.
