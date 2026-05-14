---
type: doc
name: knowledge-architecture
description: Knowledge architecture for the Gym Buddy agent core
category: architecture
generated: 2026-05-13
status: draft
language: pt-BR
---

# Knowledge Architecture - Gym Buddy

## Objetivo

Definir como o conhecimento do Gym Buddy deve ser organizado antes de conectar IA generativa, Google Drive ou qualquer processo de sincronizacao.

O objetivo e manter o agente simples, auditavel e seguro: ele deve responder a partir de conhecimento curado, guardrails e playbooks operacionais, nao a partir de material bruto sem revisao.

## Papel do Google Drive

O Google Drive pode ser usado como reposititorio editorial e fonte humana de organizacao. Nesta etapa, esse uso e apenas manual e documental; nao ha sincronizacao automatica, runtime no Drive ou leitura direta pelo agente.

Uso recomendado:

- armazenar livros, artigos, anotacoes e referencias;
- organizar materiais por camada;
- manter insumos brutos e documentos em revisao;
- apoiar revisao humana antes de promover conteudo para o core.

Uso nao recomendado nesta fase:

- usar o Drive como runtime principal do agente;
- deixar o agente consultar arquivos brutos diretamente;
- tratar pastas do Drive como fonte automaticamente confiavel;
- guardar tokens, chaves, senhas ou dados sensiveis sem controle.

## Papel do Postgres

O Postgres local deve ser tratado como banco operacional do n8n. Qualquer uso como armazenamento estruturado de conhecimento e fase futura e depende de contrato de dados explicito.

Possiveis usos futuros, fora da etapa atual:

- catalogo de documentos curados;
- versoes aprovadas de playbooks;
- execucoes e avaliacoes;
- sessoes temporarias;
- metadados de sincronizacao com Drive.

Nesta etapa, nao criar tabelas novas, catalogo de conhecimento, metadados de sincronizacao ou consultas dinamicas de runtime.

## Camadas

### 1. Raw Knowledge

Camada bruta de informacao.

Pode conter:

- livros;
- artigos;
- referencias tecnicas;
- materiais de especialistas;
- anotacoes humanas;
- historicos de conversa sanitizados, somente como insumo bruto de revisao;
- duvidas reais;
- treinos enviados;
- feedbacks.

Regra principal: o agente nao consulta Raw diretamente durante atendimento.

Funcao: servir como repositorio de aprendizado e insumo para revisao humana.

### 2. Curated Technical Knowledge

Camada tecnica consolidada e revisada.

Contem a visao oficial do Gym Buddy sobre:

- hipertrofia;
- volume;
- intensidade;
- frequencia;
- descanso;
- progressao;
- proximidade da falha;
- selecao de exercicios;
- substituicoes;
- execucao geral;
- montagem de treinos;
- sinais de risco.

Funcao: transformar material bruto em conhecimento tecnico confiavel, consistente e padronizado.

### 3. Behavioral & Safety Guardrails

Camada de regras de comportamento, seguranca e escopo.

Contem:

- o que o agente pode responder;
- o que nao pode responder;
- quando redirecionar;
- como lidar com dor;
- como lidar com lesoes;
- como responder sobre carga;
- regras de personalizacao e limites de autonomia;
- criterios de interrupcao ou redirecionamento.

Funcao: impedir extrapolacao de papel, falsa personalizacao e respostas inseguras para casos de risco.

### 4. Session Playbooks

Camada operacional usada no atendimento.

Contem fluxos para situacoes recorrentes:

- onboarding;
- analise de treino escrito;
- analise de imagem;
- substituicao de exercicio;
- treino curto;
- duvida de execucao;
- montagem de treino geral;
- dor ou desconforto;
- explicacao de conceitos.

Funcao: transformar conhecimento tecnico em conversas curtas, uteis e repetiveis.

### 5. Response Generation

Camada de geracao final da resposta.

Contem:

- templates de resposta;
- tom de voz;
- tamanho maximo recomendado;
- exemplos bons e ruins;
- estrutura de resposta por tipo de situacao;
- regras de clareza e concisao.

Funcao: separar o raciocinio operacional do formato final enviado ao usuario.

## Runtime MVP com cards curados

O MVP pode usar uma versao simples de injecao controlada de contexto:

- o roteador detecta a intent;
- a intent seleciona um ou poucos cards curados compactos;
- o card entra no prompt do LLM local;
- Raw Knowledge continua proibido no runtime;
- nao ha RAG, embeddings ou busca automatica.

Essa abordagem e temporaria e auditavel. Ela permite testar qualidade do modelo local sem criar infraestrutura prematura.

## Prioridade de decisao

O core deve aplicar as camadas nesta ordem:

1. Guardrails de seguranca.
2. Escopo do produto.
3. Playbook aplicavel.
4. Conhecimento tecnico curado.
5. Geracao final da resposta.

Raw Knowledge nunca entra diretamente nessa cadeia.

## Proxima etapa

A proxima etapa documental e preparar auditoria e conversao manual da base de conhecimento, sem runtime do agente:

- inventario manual de Raw Knowledge;
- auditoria por camada, risco e prioridade;
- registro de lacunas, contradicoes e conteudos sensiveis;
- selecao de candidatos para conversao curada posterior.

Prompts, playbooks executaveis e workflows devem continuar pequenos e revisaveis. RAG, embeddings, catalogo em Postgres e sincronizacao com Drive continuam como fase futura ate decisao explicita de escopo.
