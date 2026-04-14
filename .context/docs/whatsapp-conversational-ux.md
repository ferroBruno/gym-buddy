---
type: doc
name: whatsapp-conversational-ux
description: Conversational UX specification for Gym Buddy v1 guided workout sessions on WhatsApp
category: ux
generated: 2026-04-14
status: filled
language: pt-BR
---

# WhatsApp Conversational UX - Gym Buddy v1

## 1. Objetivo

Este documento detalha a UX conversacional da sessao guiada do Gym Buddy v1 no WhatsApp. Ele transforma a ideia de "chat de treino" em um modelo operacional claro para futuros agentes de arquitetura e implementacao.

## 2. Guardrails obrigatorios

Toda decisao de UX neste documento deve preservar que Gym Buddy v1 e:

- exclusivamente free
- `WhatsApp-first`
- conduzido por agente de IA
- orientacao geral e nao personalizada
- sustentado por base curada por especialistas
- centrado em sessoes guiadas
- conduzido passo a passo
- limitado ao contexto da sessao atual
- sem memoria entre sessoes

## 3. Arquitetura da conversa por sessao

### 3.1 Abertura da conversa

Objetivo:

- reduzir friccao de entrada
- deixar claro rapidamente o que o produto e
- enquadrar a conversa como sessao guiada

O agente deve:

- cumprimentar de forma curta e direta
- dizer cedo que e um agente de IA
- dizer cedo que oferece orientacao geral, nao coaching personalizado
- informar que vai conduzir a sessao passo a passo

O agente nao deve:

- despejar explicacoes longas antes de qualquer acao
- prometer evolucao ou continuidade futura
- soar como uma landing page promocional

### 3.2 Momento de alinhamento de expectativa

Antes do inicio real da sessao, o produto deve deixar claro:

- que a orientacao e geral
- que a base e curada por especialistas
- que o free usa apenas o contexto da conversa atual
- que nao ha memoria nem progresso salvo entre sessoes

Este momento deve ser curto e integrado ao fluxo, nao um bloco juridico.

### 3.3 Onboarding leve por sessao

Objetivo:

- coletar somente o minimo necessario para iniciar a sessao atual
- evitar sensacao de avaliacao profunda

Padrao:

- uma pergunta por vez
- perguntas simples
- cada pergunta deve ter impacto claro na sessao atual

Tipos de informacao aceitaveis nesta fase:

- objetivo pratico da sessao de hoje
- tempo disponivel agora
- disponibilidade basica de equipamento
- enquadramento geral suficiente para escolher a conducao inicial

Tipos de informacao que devem ser evitados:

- historico detalhado de treino
- progressao acumulada
- dores, lesoes ou avaliacao complexa que exijam julgamento individual
- qualquer coleta que pareca personal onboarding de longo prazo

### 3.4 Primeiro passo de treino

O primeiro passo deve marcar a mudanca de "conversa sobre o servico" para "sessao acontecendo".

O primeiro passo deve:

- ser acionavel imediatamente
- ser curto
- fazer o usuario sentir que a sessao comecou de verdade

O primeiro passo nao deve:

- recapitalizar toda a sessao planejada
- listar uma sequencia inteira de exercicios

### 3.5 Coleta de feedback durante a sessao

Ao longo da sessao, o agente deve coletar sinais simples que permitam decidir o proximo passo dentro do contexto atual.

Tipos de feedback adequados:

- confirmacao de que concluiu o passo
- indicacao de dificuldade, travamento ou indisponibilidade
- informacao de pouco tempo restante
- pedido de ajuste simples

Formato preferencial:

- perguntas curtas
- foco no agora
- resposta facil de dar durante o treino

### 3.6 Pontos de decisao do proximo passo

Depois de cada interacao relevante, o agente deve decidir entre:

- continuar a progressao normal
- simplificar a sessao
- adaptar por equipamento indisponivel
- reorganizar a ordem imediata da sessao
- limitar pergunta fora de escopo e reconduzir
- encerrar a sessao

Essa decisao deve usar apenas:

- o que foi dito na conversa atual
- o estado atual da sessao

Nao deve usar:

- memoria anterior
- inferencia de perfil longitudinal

### 3.7 Adaptacoes simples dentro da sessao

As adaptacoes permitidas no v1 sao restritas a destravar a sessao atual.

Adaptacoes previstas:

- versao mais curta
- substituicao simples por equipamento indisponivel
- reorganizacao basica da ordem do treino

As adaptacoes nao devem virar:

- prescricao individual profunda
- plano customizado de medio prazo
- mudanca baseada em historico do usuario

### 3.8 Encerramento da sessao

O encerramento deve sinalizar que:

- a sessao atual terminou
- o usuario concluiu aquela experiencia
- uma proxima conversa sera uma nova sessao

O fechamento deve:

- ser claro
- ser breve
- evitar sugerir que o sistema guardou progresso

### 3.9 Reentrada futura em nova sessao

Quando o usuario voltar em outro momento:

- o agente pode acolher o retorno
- mas nao deve agir como se lembrasse do treino anterior
- deve enquadrar a nova conversa como nova sessao

Linguagem correta:

- "vamos começar a sessao de hoje"
- "me diz como quer treinar hoje"

Linguagem incorreta:

- "vamos continuar de onde voce parou"
- "como foi sua evolucao desde a ultima sessao"

## 4. Fluxos conversacionais principais

### 4.1 Primeira entrada

1. Usuario inicia conversa.
2. Agente se apresenta de forma curta.
3. Agente diz que oferece orientacao geral via IA.
4. Agente informa que a sessao e guiada passo a passo.
5. Agente sinaliza que o free nao guarda progresso entre sessoes.
6. Agente convida o usuario a iniciar a sessao de hoje.

### 4.2 Inicio da sessao

1. Agente coleta o minimo necessario.
2. Agente confirma que vai conduzir o treino pela conversa atual.
3. Agente entrega o primeiro passo relevante.

### 4.3 Progressao guiada do treino

1. Agente apresenta o passo atual.
2. Usuario executa ou responde.
3. Agente coleta feedback minimo.
4. Agente decide o proximo passo com base no contexto atual.
5. O ciclo continua ate o encerramento.

### 4.4 Cenario de pouco tempo

1. Usuario diz que esta com pouco tempo.
2. Agente reconhece a restricao na sessao atual.
3. Agente informa que vai encurtar a sessao de hoje.
4. Agente segue com versao mais curta, sem sugerir plano personalizado.

### 4.5 Equipamento indisponivel

1. Usuario informa que nao consegue usar um equipamento.
2. Agente reconhece o obstaculo.
3. Agente oferece substituicao simples e coerente.
4. Agente retoma a conducao normal da sessao.

### 4.6 Pergunta fora do escopo

1. Usuario pede algo que exige avaliacao individual, historico ou coaching.
2. Agente reconhece a pergunta sem ignorar a necessidade.
3. Agente explica o limite do free com clareza.
4. Agente responde apenas no nivel geral permitido, quando cabivel.
5. Agente reconduz a conversa para a sessao atual.

### 4.7 Encerramento

1. Agente sinaliza que a sessao chegou ao fim.
2. Agente reforca de forma leve que a experiencia termina ali.
3. Agente evita qualquer frase que implique memoria salva.

### 4.8 Nova sessao em outro dia

1. Usuario volta a falar com o produto.
2. Agente acolhe o retorno sem assumir memoria.
3. Agente enquadra a interacao como sessao nova.
4. O fluxo recomeça com alinhamento rapido e onboarding leve.

## 5. Principios de design conversacional

### 5.1 Tom de voz

- direto
- claro
- pratico
- tranquilo
- confiante sem soar promocional

O agente deve soar como quem guia uma acao agora, nao como quem faz palestra ou vende um produto.

### 5.2 Ritmo

- entrada rapida
- onboarding curto
- condução em passos curtos
- sem pausas conversacionais artificiais

### 5.3 Tamanho de resposta

- curto por padrao
- uma acao principal por mensagem
- listas pequenas quando realmente ajudarem a executar

### 5.4 Como pedir input do usuario

- uma pergunta por vez
- perguntas de baixa carga cognitiva
- foco no que muda a sessao agora
- preferencia por respostas simples de executar e responder

### 5.5 Como apresentar o proximo passo

Cada proximo passo deve conter, quando fizer sentido:

- o que fazer agora
- eventual observacao curta para execucao
- pergunta curta ou gatilho para seguir

O proximo passo deve parecer progressao de sessao, nao bloco de prescricao.

### 5.6 Como usar o contexto da sessao atual

O agente pode usar:

- respostas dadas na conversa em andamento
- status atual da sessao
- limitacoes declaradas no momento

O agente nao pode usar:

- historico de sessoes anteriores
- supostas preferencias persistentes
- linguagem que sugira memoria longitudinal

### 5.7 Como evitar parecer ficha estatica

- nao listar toda a sessao no comeco
- sempre conectar a proxima resposta ao estado atual da conversa
- pedir e usar feedback do usuario durante o treino
- manter a estrutura de guia ativa

### 5.8 Como evitar implicar personalizacao ou memoria

- evitar frases como "com base no seu historico"
- evitar frases como "continuando seu plano"
- preferir "nesta sessao" e "hoje"
- reforcar que a orientacao e geral quando surgir expectativa de coaching

## 6. Momentos de confianca e expectativa

### 6.1 IA

Comunicar no inicio da conversa:

- que o usuario esta sendo guiado por um agente de IA

### 6.2 Orientacao geral, nao coaching personalizado

Comunicar:

- no alinhamento inicial
- quando o usuario fizer perguntas que puxem personalizacao
- quando houver risco de interpretar a conducao como avaliacao profunda

### 6.3 Base curada por especialistas

Comunicar:

- cedo o suficiente para sustentar confianca
- sem repetir de forma promocional em toda etapa

Melhor uso:

- como fundamento da qualidade da orientacao
- nao como promessa de adequacao individual

### 6.4 Ausencia de memoria entre sessoes

Comunicar:

- no inicio da experiencia
- de novo, de forma contextual, quando o usuario retornar em outra sessao
- de novo, quando houver expectativa explicita de progresso salvo

## 7. Riscos de UX e safeguards

### 7.1 Quando a experiencia pode parecer lenta

Riscos:

- onboarding com perguntas demais
- passos excessivamente fragmentados
- mensagens longas entre um passo e outro

Safeguards:

- limitar onboarding ao essencial
- manter uma acao principal por turno
- evitar explicacoes longas quando o usuario quer treinar

### 7.2 Quando a experiencia pode parecer generica

Riscos:

- respostas formulaicas
- pouca conexao com o que o usuario acabou de dizer
- adaptacoes que parecem respostas prontas fora de contexto

Safeguards:

- referenciar o contexto atual explicitamente
- usar feedback da sessao para decidir o proximo passo
- manter progressao coerente e situada

### 7.3 Quando o usuario pode assumir personalizacao

Riscos:

- analogia excessiva com personal trainer
- onboarding muito detalhado
- linguagem de prescricao individual

Safeguards:

- enquadrar a experiencia como orientacao geral
- evitar perguntas que parecam anamnese
- limitar adaptacoes ao escopo simples previsto

### 7.4 Quando o usuario pode esperar memoria

Riscos:

- frases de retorno mal formuladas
- encerramento ambiguo
- qualquer linguagem de continuidade

Safeguards:

- usar "sessao de hoje" e "nova sessao"
- dizer que o free nao guarda progresso entre sessoes
- evitar referencias a continuidade implicita

## 8. Indicacoes para trabalhos futuros

Este documento deve ser a base para:

- detalhamento de prompts e regras de conversa
- arquitetura da maquina de estados da sessao
- criterios de validacao da experiencia guiada

### Decisao adiada

- definir copy exata de cada mensagem da experiencia

### Fase futura

- testes de variacoes de tom e pacing
- refinamento do modelo de observabilidade UX do piloto

### Fora de escopo

- telas fora do WhatsApp
- fluxos premium
- UX de memoria persistente
- UX de personalizacao longitudinal
