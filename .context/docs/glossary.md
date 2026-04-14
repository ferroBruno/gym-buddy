---
type: doc
name: glossary
description: Project terminology, type definitions, domain entities, and business rules
category: glossary
generated: 2026-04-14
status: filled
language: pt-BR
---

# Glossary - Gym Buddy v1

## Termos centrais

### Gym Buddy v1

Primeira versao do produto, focada exclusivamente no plano gratuito e em validar utilidade, clareza, confianca, retorno de uso e potencial de alcance.

### Free

Camada gratuita do produto. No v1, `free` nao e porta de entrada para premium ja operacionalizado. E o proprio escopo inteiro do produto nesta fase.

### WhatsApp-first

Decisao de produto de usar o WhatsApp como canal principal de entrada e uso para reduzir friccao e aproveitar um ambiente familiar ao usuario.

### Agente de IA

Motor conversacional que conduz a experiencia e entrega orientacao geral de treino dentro dos limites do produto.

### Orientacao geral

Orientacao util e tecnicamente fundamentada, mas nao personalizada em profundidade e nao baseada em historico persistente do usuario.

### Base curada por especialistas

Conjunto de referencias e conhecimento selecionado e validado por especialistas em treinamento para sustentar a qualidade da orientacao do agente.

### Sessao guiada

Experiencia central do produto. O treino e conduzido progressivamente por conversa, com um proximo passo relevante apresentado de cada vez.

### Contexto da sessao atual

Informacoes fornecidas pelo usuario e pelo proprio andamento da conversa em curso. Este e o unico contexto que pode orientar a progressao da sessao no free.

### Sessoes independentes

Regra de produto segundo a qual cada sessao comeca e termina em si mesma. Uma nova sessao nao deve ser tratada como continuacao personalizada da anterior.

### Adaptacoes simples

Ajustes limitados permitidos dentro da sessao atual, sem virar avaliacao individual profunda. Exemplos aceitos no PRD:

- versao mais curta da sessao
- substituicao simples por equipamento indisponivel
- reorganizacao basica da sessao

### Encerramento claro

Momento em que o produto sinaliza explicitamente ou de forma inequivoca que a sessao terminou e nao pressupoe memoria longitudinal.

### Registro operacional minimo

Coleta leve de sinais de uso, duvidas, friccao, confianca e valor percebido para aprendizado do piloto. Nao implica stack robusta de analytics.

## Termos de fronteira

### Nao personalizado

Nao deve ser descrito nem implementado como prescricao individual, avaliacao profunda, acompanhamento continuo ou recomendacao baseada em historico persistente.

### Memoria entre sessoes

Capacidade de lembrar interacoes anteriores, progresso ou preferencias para reutilizacao futura. Isso esta fora de escopo no free v1.

### Personalizacao longitudinal

Ajuste de experiencia com base em evolucao acumulada ao longo do tempo. Fora de escopo na v1.

### Coaching personalizado

Forma de acompanhamento individualizado comparavel a um personal trainer. Fora de escopo na v1.

### Piloto

Fase de validacao do produto em operacao enxuta, desenhada para gerar aprendizado antes de escala.

## Marcadores obrigatorios para escopo

### Decisao adiada

Tema relevante para o futuro, mas ainda sem necessidade de definicao nesta fase.

### Fase futura

Capacidade ou definicao que pode ser tratada depois que a v1 for validada.

### Backlog candidato

Ideia plausivel para refinamento futuro, mas nao necessaria para consolidar a v1 agora.

### Fora de escopo

Item explicitamente excluido do v1 e que nao deve ser reintroduzido por inferencia.
