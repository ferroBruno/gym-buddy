---
type: doc
name: knowledge-base-audit-process
description: Process for auditing Gym Buddy knowledge-base material before curated conversion
category: knowledge
generated: 2026-05-13
status: draft
language: pt-BR
---

# Knowledge Base Audit Process - Gym Buddy

## 1. Objetivo

Definir um processo documental e auditavel para entender a base de conhecimento existente no Google Drive ou em arquivos locais antes de qualquer uso operacional pelo agente.

A auditoria deve responder:

- quais arquivos existem;
- que tipo de conhecimento eles contem;
- onde cada conteudo se encaixa na arquitetura de conhecimento atual;
- o que pode ser promovido para camadas curadas;
- o que deve permanecer apenas como Raw Knowledge;
- quais riscos, lacunas e contradicoes precisam de revisao humana.

Esta etapa nao transforma a base em runtime do agente.

## 2. Principios da auditoria

- Raw Knowledge nunca deve ser consultada diretamente no atendimento ao usuario.
- Todo conteudo promovido deve passar por revisao humana.
- A classificacao deve preservar rastreabilidade ate o arquivo original.
- A auditoria deve separar fato tecnico, interpretacao operacional, exemplo de conversa e decisao de produto.
- Conteudos sobre dor, lesao, reabilitacao, diagnostico, suplementacao, medicacao ou carga absoluta devem ser tratados como sensiveis.
- O escopo da v1 permanece Telegram-first, n8n como orquestrador, Postgres como suporte operacional local e ausencia de memoria longitudinal.
- O agente deve conduzir o usuario passo a passo durante a sessao, sem despejar ficha completa como prescricao individual.

## 3. O que a auditoria nao faz

A auditoria nao:

- conecta Google Drive;
- cria sincronizacao automatica;
- cria scripts de extracao;
- cria workflow n8n;
- cria RAG runtime;
- cria embeddings;
- cria catalogo em Postgres;
- cria core de IA executavel;
- transforma Raw Knowledge em prompt final;
- decide regras clinicas ou prescricoes individuais;
- resolve divergencias documentais existentes.

## 4. Diferenca entre inventario, auditoria e conversao

Inventario e o registro do que existe: nome, origem, tipo, tema, autoria, data conhecida e metadados basicos.

Auditoria e a analise controlada do conteudo: classificacao por camada, riscos, prioridade, lacunas, contradicoes e recomendacao de tratamento.

Conversao e a producao posterior de artefatos curados: documentos tecnicos consolidados, guardrails, playbooks, templates de resposta ou casos de avaliacao. Conversao so deve acontecer depois de auditoria e revisao humana.

## 5. Camadas de destino

- Raw Knowledge: materiais brutos, referencias, exemplos, feedbacks e historicos. Nao entra no atendimento direto.
- Curated Technical Knowledge: visao tecnica consolidada e revisada sobre hipertrofia geral e conceitos de treino.
- Behavioral & Safety Guardrails: limites, escopo, seguranca, redirecionamentos e regras de autonomia.
- Session Playbooks: fluxos operacionais para situacoes recorrentes durante uma sessao guiada.
- Response Generation: padroes de tom, estrutura, tamanho e exemplos de resposta.
- Evaluation: casos de teste, criterios de qualidade, exemplos bons e ruins e validacao.

## 6. Criterios de classificacao

Classifique cada arquivo pelo uso mais seguro e revisavel, nao pelo uso mais ambicioso.

- Referencia tecnica ampla: tende a Raw Knowledge ou Curated Technical Knowledge apos consolidacao.
- Nota de especialista: tende a Raw Knowledge ate ser revisada e incorporada em documento curado.
- Feedback de usuario: tende a Raw Knowledge, Evaluation ou insumo para playbook.
- Exemplo de treino: tende a Raw Knowledge, Session Playbooks ou Evaluation, sem virar prescricao individual.
- Conteudo de seguranca: tende a Behavioral & Safety Guardrails se for revisado e escrito como regra operacional.
- Exemplo de resposta: tende a Response Generation se respeitar escopo, tom e seguranca.
- Caso bom ou ruim: tende a Evaluation quando houver criterio claro de avaliacao.
- Conteudo clinico: tende a guardrail, redirecionamento ou fora de escopo, nunca a orientacao direta.

## 7. Criterios de risco

Use `high` quando o conteudo puder induzir:

- diagnostico, reabilitacao ou decisao clinica;
- prescricao individual;
- promessa de resultado;
- uso de carga absoluta sem contexto;
- orientacao sobre dor persistente, lesao ou condicao medica;
- aconselhamento sobre suplementos, medicacao ou imagem corporal;
- falsa memoria ou continuidade entre sessoes.

Use `medium` quando o conteudo for tecnico, mas depender de contexto, revisao ou delimitacao de escopo.

Use `low` quando o conteudo for operacional, geral, nao sensivel e claramente alinhado a sessao guiada.

## 8. Criterios de prioridade

Prioridade alta:

- conteudo com impacto direto em seguranca;
- materiais que afetam o comportamento central do agente;
- temas recorrentes no uso Telegram-first;
- contradicoes que podem gerar resposta insegura.

Prioridade media:

- conteudo tecnico util para hipertrofia geral;
- exemplos que podem melhorar playbooks ou respostas;
- lacunas que afetam clareza, mas nao bloqueiam seguranca.

Prioridade baixa:

- material redundante;
- referencias amplas sem aplicacao imediata;
- ideias de fase futura ou backlog candidato.

## 9. Processo de inventario

1. Definir o lote auditado e sua origem.
2. Registrar todos os arquivos conhecidos no template de auditoria.
3. Preencher metadados basicos: caminho, tipo, fonte, autoria, data, tema principal e observacoes.
4. Marcar arquivos ilegiveis, duplicados, incompletos ou sem origem confiavel.
5. Atribuir uma camada recomendada preliminar.
6. Marcar risco de uso direto e flags sensiveis.
7. Preservar o arquivo original como Raw Knowledge, mesmo quando houver recomendacao de conversao futura.

## 10. Processo de amostragem

Quando o lote for grande, a auditoria pode comecar por amostragem.

Priorize amostras que representem:

- temas de treino mais recorrentes;
- conteudos sobre dor, lesao ou risco;
- exemplos reais de conversa;
- documentos com autoria conhecida;
- materiais frequentemente citados por humanos;
- arquivos com potencial de contradicao ou promessa indevida.

A amostragem deve declarar o criterio usado e nao deve apresentar conclusoes sobre arquivos nao analisados como se fossem confirmadas.

## 11. Processo de conversao

A conversao deve ocorrer em etapa posterior e gerar artefatos pequenos, revisaveis e versionados.

Fluxo recomendado:

1. Selecionar conteudo auditado com prioridade e justificativa.
2. Identificar a camada de destino.
3. Escrever o artefato curado em linguagem operacional.
4. Remover detalhes que dependam de prescricao individual.
5. Transformar riscos clinicos em guardrails ou redirecionamentos.
6. Incluir referencia ao arquivo de origem no registro de rastreabilidade.
7. Submeter a revisao humana antes de uso pelo agente.
8. Atualizar casos de avaliacao quando o comportamento esperado mudar.

Promover conteudo de Raw Knowledge nao significa copiar texto bruto para o core. Significa consolidar, revisar, delimitar e transformar em regra, playbook, template ou criterio verificavel.

## 12. Tratamento de contradicoes

Contradicoes devem ser registradas como pendencia, nao resolvidas por inferencia.

Para cada contradicao, registre:

- arquivos ou documentos envolvidos;
- tema;
- impacto potencial no comportamento do agente;
- risco se usado diretamente;
- camada afetada;
- decisao pendente ou revisao necessaria.

Enquanto nao houver decisao, o conteudo contraditorio deve permanecer como Raw Knowledge e nao deve influenciar respostas do agente.

## 13. Tratamento de conteudo sensivel

Conteudo sensivel inclui dor, lesao, condicoes clinicas, reabilitacao, carga absoluta, prescricao individual, promessa de resultado, imagem corporal, suplementos e medicacao.

Regras:

- nao converter conteudo sensivel em instrucao direta ao usuario;
- preferir guardrails, criterios de interrupcao ou redirecionamento;
- deixar claro quando o agente deve orientar busca de profissional qualificado;
- evitar linguagem de diagnostico;
- nao criar plano individual, tratamento ou retorno pos-lesao;
- nao preservar dados pessoais reais em documentos versionados.

## 14. Rastreabilidade

Cada recomendacao de conversao deve manter:

- identificador ou caminho do arquivo original;
- data do lote auditado;
- responsavel pela auditoria;
- resumo da decisao;
- camada recomendada;
- risco de uso direto;
- revisao humana exigida;
- notas sobre impacto no comportamento do agente.

Rastreabilidade nao autoriza consulta direta ao Raw Knowledge. Ela existe para auditoria, revisao e manutencao.

## 15. Artefatos produzidos

Esta frente pode produzir:

- inventario de arquivos;
- relatorio de auditoria por lote;
- mapa de conversao recomendado;
- lista de lacunas;
- lista de contradicoes;
- lista de conteudos sensiveis;
- recomendacoes de documentos curados futuros.

Nao produz nesta etapa:

- scripts;
- tabelas;
- embeddings;
- workflows finais;
- prompts finais do agente;
- sincronizacao com Google Drive.

## 16. Checklist de revisao humana

- O arquivo original permanece tratado como Raw Knowledge?
- A camada recomendada esta alinhada a arquitetura atual?
- O risco de uso direto foi marcado?
- Flags sensiveis foram revisadas?
- Ha risco de prescricao individual, diagnostico ou reabilitacao?
- A recomendacao preserva ausencia de memoria longitudinal?
- A recomendacao preserva sessao guiada passo a passo?
- O conteudo evita ficha completa imediata como resposta padrao?
- Contradicoes foram registradas sem resolucao indevida?
- A rastreabilidade ate a origem esta clara?
- Nenhum segredo, token, URL privada ou dado pessoal real foi versionado?

## 17. Pendencias documentais

Durante a preparacao deste processo, os seguintes documentos citados como referencias principais nao foram encontrados em `.context/docs/`:

- `architecture.md`;
- `data-flow.md`;
- `testing-strategy.md`;
- `product-requirements-v1.md`;
- `n8n-telegram-workflow.md`.

A documentacao atual indica que parte do contexto foi consolidada em `project-overview.md`, `knowledge-architecture.md`, `core-agent-plan.md` e guias de workflow. Esta pendencia e apenas documental; nao deve ser usada para expandir escopo ou recriar documentos fora da tarefa atual.

## 18. Proximos passos

1. Usar `knowledge-base-audit-template.md` para o primeiro lote manual.
2. Preencher o inventario com base no schema definido em `knowledge-inventory-schema.md`.
3. Classificar arquivos por camada, risco e prioridade.
4. Registrar lacunas, contradicoes e conteudos sensiveis.
5. Selecionar poucos candidatos para conversao humana posterior.
6. Atualizar a documentacao curada apenas depois de revisao.
