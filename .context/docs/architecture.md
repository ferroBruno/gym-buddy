---
type: doc
name: architecture
description: System architecture, layers, patterns, and design decisions
category: architecture
generated: 2026-04-14
status: filled
language: pt-BR
---

# Architecture Notes - Gym Buddy v1

## 1. Objetivo

Este documento define a arquitetura minima viavel do Gym Buddy v1. O foco e sustentar sessoes guiadas de treino via WhatsApp com um agente de IA, usando apenas o contexto da sessao atual e sem memoria persistente entre sessoes.

## 2. Guardrails obrigatorios

A arquitetura da v1 deve preservar:

- produto exclusivamente free
- experiencia `WhatsApp-first`
- orientacao geral e nao personalizada
- sessoes guiadas passo a passo
- uso apenas do contexto da sessao atual
- ausencia de memoria longitudinal
- base curada por especialistas como fonte de qualidade
- operacao enxuta para aprendizado de piloto

## 3. Arquitetura de alto nivel

### 3.1 Componentes principais

#### Canal WhatsApp

Responsabilidade:

- receber mensagens do usuario
- entregar respostas do agente
- servir como interface unica da experiencia

#### Gateway de conversa

Responsabilidade:

- receber eventos do canal
- normalizar entrada e saida
- encaminhar a mensagem para a orquestracao da sessao

#### Orquestrador de sessao

Responsabilidade:

- criar e manter o estado da sessao ativa
- decidir a etapa atual da conversa
- chamar regras e conhecimento necessarios
- pedir a proxima resposta do agente

Este e o centro da logica da v1.

#### Motor de politica e guardrails

Responsabilidade:

- reforcar limites do free
- impedir deriva para coaching personalizado
- impedir respostas que sugiram memoria entre sessoes
- limitar perguntas fora de escopo

#### Camada de conhecimento curado

Responsabilidade:

- disponibilizar regras, principios e referencias curadas por especialistas
- sustentar consistencia tecnica da orientacao
- fornecer insumos para a sessao sem virar memoria de usuario

#### Gerador conversacional

Responsabilidade:

- transformar o estado atual da sessao, as regras e o conhecimento aplicavel em uma resposta curta e acionavel

#### Registro operacional minimo

Responsabilidade:

- registrar eventos leves do piloto
- capturar inicio e fim de sessao
- registrar duvidas recorrentes, friccao e sinais de valor percebido

### 3.2 Fluxo de alto nivel

1. Usuario envia mensagem no WhatsApp.
2. O gateway normaliza e identifica a sessao ativa ou inicia uma nova.
3. O orquestrador de sessao le o estado da sessao atual.
4. O motor de guardrails aplica limites de produto.
5. A camada de conhecimento fornece regras e conteudo relevantes.
6. O gerador conversacional produz a proxima resposta.
7. A resposta volta pelo gateway ao WhatsApp.
8. Eventos leves da sessao podem ser registrados para aprendizado do piloto.

## 4. Arquitetura da sessao

### 4.1 Inicio da sessao

No inicio, o sistema deve:

- abrir uma nova sessao de conversa
- assumir zero memoria historica do usuario
- registrar apenas o identificador tecnico necessario para o turno atual

Uma nova sessao deve ser tratada como unidade isolada de execucao.

### 4.2 Onboarding leve da sessao atual

O orquestrador deve coletar apenas os campos necessarios para conduzir a sessao de hoje. Esses dados pertencem ao estado temporario da sessao, nao ao perfil persistente do usuario.

Exemplos adequados:

- objetivo pratico do treino de hoje
- tempo disponivel agora
- disponibilidade imediata de equipamento

### 4.3 Orquestracao passo a passo

O estado da sessao deve incluir apenas o necessario para guiar a conversa corrente, por exemplo:

- etapa atual da sessao
- contexto declarado pelo usuario na conversa atual
- ultimo passo entregue
- sinais recentes de feedback do usuario
- marcadores de adaptacao aplicados na sessao atual

O sistema nao precisa de um plano completo persistido para alem da sessao. Basta a estrutura suficiente para calcular o proximo passo relevante.

### 4.4 Tratamento de feedback do usuario

O feedback recebido durante o treino deve ser absorvido como atualizacao do estado da sessao ativa.

Exemplos:

- concluiu o passo
- esta com pouco tempo
- equipamento indisponivel
- pergunta fora de escopo

O efeito arquitetural esperado e simples:

- atualizar o estado da sessao
- recalcular a proxima decisao

### 4.5 Logica de decisao do proximo passo

A decisao do proximo passo deve resultar da combinacao de:

- etapa atual da sessao
- regras do produto
- contexto da conversa atual
- conhecimento curado relevante

Essa logica deve ficar fora do modelo generativo puro. O modelo pode formular a resposta, mas a progressao da sessao deve ser orientada por regras e estado.

### 4.6 Adaptacoes simples

As adaptacoes do v1 devem ser tratadas como desvios controlados na maquina de sessao, nao como motor de personalizacao.

Casos permitidos:

- encurtar sessao
- substituir equipamento indisponivel
- reorganizar ordem imediata

### 4.7 Encerramento da sessao

No encerramento, o sistema deve:

- marcar a sessao como concluida ou encerrada
- emitir a mensagem final de fechamento
- liberar ou expirar o estado temporario da sessao

O encerramento nao deve alimentar perfil historico do usuario.

### 4.8 Nova sessao sem continuidade historica

Quando o usuario voltar em outro momento:

- o sistema pode reconhecer o canal/contato como origem tecnica da nova conversa
- mas nao deve carregar contexto funcional da sessao anterior
- a nova sessao deve nascer vazia em termos de memoria de produto

## 5. Onde vive o contexto da sessao

### 5.1 Estado temporario

O contexto da sessao deve viver em armazenamento temporario ou em uma estrutura de sessao com TTL curta, suficiente para suportar a conversa em andamento.

Objetivo:

- manter coerencia durante a sessao
- permitir retomada de curto prazo em caso de atraso natural do chat
- evitar virar historico de produto entre dias ou sessoes

### 5.2 O que pode existir tecnicamente sem virar memoria de produto

A arquitetura pode manter identificadores tecnicos minimos de canal e registros operacionais do piloto, desde que:

- nao sejam usados para personalizar sessoes futuras
- nao sejam usados para reconstruir evolucao do usuario
- nao sejam tratados como memoria funcional da experiencia

## 6. Arquitetura de conhecimento

### 6.1 Organizacao conceitual da base curada

A base curada deve ser organizada em camadas conceituais simples:

- principios gerais de treino dentro do escopo do free
- regras de seguranca e limites do produto
- blocos de sessao e padroes de progressao
- opcoes simples de adaptacao permitida
- orientacoes para redirecionamento de perguntas fora de escopo

### 6.2 Como o agente acessa o conhecimento

Durante a sessao, o orquestrador deve selecionar apenas o conhecimento relevante para:

- a etapa atual
- o tipo de sessao em andamento
- a necessidade imediata de progressao ou adaptacao

O agente nao deve consultar um corpo amplo e irrestrito de conhecimento a cada turno se isso aumentar variabilidade e complexidade. A preferencia e por recuperacao enxuta e contextual.

### 6.3 Regras estruturadas vs geracao flexivel

Deve ficar em regras estruturadas:

- limites do free
- ausencia de memoria entre sessoes
- condicoes de progressao da sessao
- adaptacoes simples permitidas
- respostas de limite para fora de escopo

Pode ficar em geracao flexivel:

- formulacao natural da mensagem
- variacoes de linguagem dentro do tom definido
- pequenas adaptacoes de wording para manter fluidez conversacional

### 6.4 Como preservar consistencia no free

Consistencia deve vir da combinacao de:

- regras de produto
- conhecimento curado selecionado
- padrao de sessao guiada
- prompts e templates derivados do UX spec

## 7. Arquitetura operacional da v1

### 7.1 Observabilidade minima

O modelo operacional da v1 deve registrar apenas o suficiente para aprender com o piloto:

- inicio de sessao
- encerramento de sessao
- cenarios de adaptacao acionados
- perguntas fora de escopo recorrentes
- sinais de friccao
- sinais de valor percebido

### 7.2 Forma operacional recomendada

Priorizar solucao simples, por exemplo:

- logs estruturados leves
- planilha, tabela simples ou armazenamento operacional basico para sumarizacao do piloto
- revisoes periodicas humanas dos principais eventos e exemplos

### 7.3 O que nao precisa nesta fase

- data warehouse
- pipeline analitico sofisticado
- painel robusto
- motor de monitoramento em tempo real
- arquitetura orientada a hiperescala

## 8. Restricoes e nao-objetivos deliberados

### 8.1 Nao-objetivos

- premium
- monetizacao
- memoria longitudinal
- personalizacao entre sessoes
- motor de recomendacao individual
- arquitetura para app nativo
- stack desenhada primeiro para escala

### 8.2 Restricoes de desenho

- qualquer persistencia deve ser justificada como operacional ou tecnica, nunca como memoria funcional do produto
- qualquer componente novo deve provar que reduz risco real da v1
- a arquitetura deve ser legivel para agentes futuros e facil de implementar incrementalmente

## 9. Riscos tecnicos e decisoes adiadas

### 9.1 Pontos frageis

- perda de coerencia se o estado temporario da sessao for insuficiente
- deriva do modelo para respostas excessivamente genericas ou fora de escopo
- risco de usar registros operacionais como memoria de produto por acidente
- complexidade desnecessaria se a base curada nao for organizada de forma enxuta

### 9.2 Decisoes adiadas

- tecnologia exata de armazenamento temporario de sessao
- forma exata de recuperacao da base curada
- escolha final do provedor e do stack de inferencia
- nivel de automacao do registro operacional do piloto

### 9.3 Caminhos futuros provaveis

- evoluir a maquina de sessao para fluxos mais robustos
- melhorar recuperacao de conhecimento curado
- sofisticar observabilidade do piloto
- avaliar memoria e personalizacao apenas em fases futuras, se o produto justificar

### 9.4 Fronteiras que devem permanecer protegidas na v1

- nenhuma memoria funcional entre sessoes
- nenhuma logica de evolucao historica
- nenhuma arquitetura de premium
- nenhuma personalizacao longitudinal mascarada de conveniencia tecnica

## 10. Relacao com os proximos trabalhos

Este documento deve servir como base para:

- planejamento de implementacao
- definicao da maquina de estados da sessao
- desenho dos contratos entre orquestrador, conhecimento e geracao
- definicao da observabilidade minima do piloto
