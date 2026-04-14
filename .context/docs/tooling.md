---
type: doc
name: tooling
description: Scripts, IDE settings, automation, and developer productivity tips
category: tooling
generated: 2026-04-14
status: filled
language: pt-BR
---

# Tooling & Technology Decision - Gym Buddy v1

## 1. Objetivo

Este documento define o stack minimo viavel de implementacao para o Gym Buddy v1. O foco e escolher ferramentas suficientes para colocar o produto em operacao piloto com baixa complexidade, preservando as restricoes de sessao isolada, ausencia de memoria entre sessoes e escopo exclusivamente free.

## 2. Fontes de verdade

As decisoes aqui devem respeitar principalmente:

- `project-brief.md`
- `product-requirements-v1.md`
- `whatsapp-conversational-ux.md`
- `architecture.md`

## 3. Guardrails obrigatorios

O stack da v1 deve preservar:

- produto free-only
- `WhatsApp-first`
- agente de IA com orientacao geral
- sessao guiada passo a passo
- uso apenas do contexto da sessao atual
- nenhuma memoria funcional entre sessoes
- nenhuma personalizacao longitudinal
- nenhuma arquitetura premium
- nenhuma decisao guiada por escala antes da validacao

## 4. Multi-agent input usado nesta decisao

Esta recomendacao foi consolidada a partir de tres frentes de avaliacao:

- agente de integracao e runtime: WhatsApp, backend e estado de sessao
- agente de IA e conhecimento: modelo, regras e acesso a base curada
- agente de operacao: observabilidade, piloto, desenvolvimento e deploy

## 4.1 Contexto de implementacao ja definido

Supabase definido para a v1:

- project URL: `https://xejkbhdyuvyxmbmhlito.supabase.co`
- project ref: `xejkbhdyuvyxmbmhlito`
- direct Postgres host: `db.xejkbhdyuvyxmbmhlito.supabase.co`
- database name: `postgres`

CLI baseline:

- `supabase login`
- `supabase init`
- `supabase link --project-ref xejkbhdyuvyxmbmhlito`

Credenciais e passwords devem existir apenas via variaveis de ambiente.

## 5. Opcoes candidatas por camada

### 5.1 Camada de interacao com WhatsApp

Opcoes:

- `Meta WhatsApp Cloud API`
- `Twilio WhatsApp`
- plataformas mais altas de bot/inbox

Trade-offs:

- `Meta WhatsApp Cloud API` oferece caminho oficial, menos abstracao e melhor controle para um produto pequeno.
- `Twilio WhatsApp` simplifica a integracao inicial, mas adiciona custo e dependencia de camada intermediaria.
- plataformas de inbox/bot aceleram prototipo, mas aumentam lock-in e atrapalham o controle fino da sessao guiada.

### 5.2 Backend e runtime

Opcoes:

- `Node.js 20 + TypeScript + Fastify`
- `Python + FastAPI`
- runtime serverless-only

Trade-offs:

- `Node.js + TypeScript + Fastify` encaixa bem em webhooks, orquestracao de sessao e contratos tipados.
- `Python + FastAPI` e viavel, mas nao traz vantagem forte suficiente para esta v1.
- serverless-only pode parecer simples no papel, mas complica fluxo conversacional, retries e estado de sessao.

### 5.3 Estado de sessao

Opcoes:

- memoria local do processo
- `Redis` / `Upstash Redis` com TTL curto
- `Postgres` como store de sessao

Trade-offs:

- memoria local e a opcao mais simples, mas e fragil a restart e limitada a uma instancia.
- `Redis` com TTL curto continua simples e protege a continuidade tecnica da sessao sem virar memoria de produto.
- `Postgres` e util para registros operacionais, mas pesado e arriscado como store da sessao ativa.

Decisao fixa da v1:

- `Redis` continua sendo apenas o store de estado ativo de sessao
- `Supabase Postgres` nao deve ser usado como session store da conversa em andamento

### 5.4 Camada de IA / LLM

Opcoes:

- um modelo hospedado com tool/function calling
- outro provedor hospedado com padrao semelhante
- modelo open-source auto-hospedado

Trade-offs:

- um modelo hospedado reduz complexidade operacional e acelera o piloto.
- multi-modelo ou open-source auto-hospedado aumenta carga de operacao e tuning cedo demais.

### 5.5 Acesso ao conhecimento curado

Opcoes:

- conhecimento estruturado em `Markdown`, `YAML` ou `JSON`
- retrieval semantico com vector store
- fine-tuning

Trade-offs:

- arquivos estruturados e versionados sao auditaveis, simples e adequados para regras curadas por especialistas.
- vector retrieval amplia flexibilidade, mas adiciona infraestrutura e variabilidade desnecessarias agora.
- fine-tuning e cedo demais para uma experiencia ainda em validacao.

### 5.6 Observabilidade e operacao do piloto

Opcoes:

- logs estruturados em JSON
- erro tracking leve como `Sentry`
- `Postgres` para eventos operacionais do piloto
- `Supabase Postgres` como banco persistente operacional oficial
- planilha/Notion para sumarizacao manual
- stack completa de observabilidade/BI

Trade-offs:

- logs estruturados sao suficientes para base operacional do piloto.
- `Sentry` agrega valor com pouco setup, mas pode entrar depois se a dor aparecer.
- `Supabase Postgres` permite registrar eventos de piloto de forma consultavel sem virar warehouse.
- planilha ou Notion podem complementar revisao humana, mas nao devem virar sistema central.
- stack completa de observabilidade ou BI e precoce para a v1.

### 5.7 Desenvolvimento e deploy

Opcoes:

- `GitHub Actions` + PaaS simples como `Render`
- deploy manual sem pipeline
- infraestrutura orquestrada mais pesada

Trade-offs:

- `GitHub Actions` traz repetibilidade minima sem criar processo pesado.
- PaaS simples reduz carga operacional e acelera iteracao.
- deploy manual puro e rapido no dia zero, mas enfraquece confiabilidade basica.
- Kubernetes, workers e pipelines complexos sao excesso para o piloto.

## 6. Recomendacao final para a v1

### 6.1 Stack recomendado

- WhatsApp interaction layer: `Meta WhatsApp Cloud API`
- session orchestration runtime: `Node.js 20 + TypeScript + Fastify`
- current-session state handling: `Redis` ou `Upstash Redis` com TTL curto
- AI / LLM layer: um modelo hospedado com tool/function calling
- curated knowledge access: artefatos estruturados em `Markdown` / `YAML` / `JSON`, selecionados pelo orquestrador conforme a etapa da sessao
- persistent operational database: `Supabase Postgres`
- lightweight operational layer: logs estruturados em JSON + registros operacionais em `Supabase Postgres`
- optional pilot support: `Sentry` se o piloto mostrar dor real de triagem de erros
- development and deployment baseline: `GitHub Actions` + um servico unico em PaaS simples como `Render`

### 6.2 Por que esta combinacao

Esta combinacao atende melhor a v1 porque:

- mantem a sessao guiada como centro da implementacao
- separa estado temporario de sessao de qualquer memoria longitudinal
- deixa explicita a separacao entre persistencia operacional e estado efemero de sessao
- preserva simplicidade operacional
- evita lock-in em plataformas de bot mais altas que escondem a logica de sessao
- reduz o numero de componentes que precisariam ser operados no piloto

### 6.3 Como `Supabase Postgres` deve ser usado na v1

Uso permitido:

- persistir registros operacionais de sessao
- registrar eventos de friccao e aprendizado do piloto
- guardar dados tecnicos necessarios para observabilidade leve

Uso proibido:

- reconstruir contexto personalizado em sessoes futuras
- gerar continuidade automatica entre treinos
- manter perfil longitudinal de progresso do usuario
- alimentar motor de personalizacao no free

## 7. O que precisa agora

- um endpoint webhook para WhatsApp
- um servico unico para orquestracao de sessao e integracao com o modelo
- um store temporario de sessao com TTL em `Redis`
- um banco persistente operacional em `Supabase Postgres`
- um conjunto inicial de artefatos curados estruturados
- logs estruturados
- um schema minimo de eventos operacionais do piloto
- CI basico para lint, teste, build e deploy

## 7.1 Variaveis de ambiente recomendadas

### Aplicacao

- `NODE_ENV`
- `PORT`
- `APP_BASE_URL`

### WhatsApp

- `WHATSAPP_VERIFY_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_BUSINESS_ACCOUNT_ID`

### Redis

- `REDIS_URL`
- `REDIS_TTL_SECONDS`

### Supabase / Postgres

- `SUPABASE_URL`
- `SUPABASE_PROJECT_REF`
- `SUPABASE_DB_HOST`
- `SUPABASE_DB_PORT`
- `SUPABASE_DB_NAME`
- `SUPABASE_DB_USER`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_DB_SSLMODE`
- `SUPABASE_DATABASE_URL`

Exemplo seguro:

- `SUPABASE_DB_PASSWORD=***`
- `SUPABASE_DATABASE_URL=postgresql://postgres:${SUPABASE_DB_PASSWORD}@db.xejkbhdyuvyxmbmhlito.supabase.co:5432/postgres?sslmode=require`

### Modelo

- `LLM_API_KEY`
- `LLM_MODEL`

### Observabilidade opcional

- `SENTRY_DSN`

## 8. O que fica adiado

- escolha final entre provedores hospedados de LLM se for necessario testar custo/qualidade
- detalhes finais de schema e migracoes em `Supabase Postgres`
- uso de `Sentry` desde o dia zero ou apenas apos a primeira friccao real
- vector retrieval
- fine-tuning
- multi-model routing
- filas e workers
- feature flags
- dashboard robusto
- BI e analytics mais pesados

## 9. Explicitamente fora de escopo na v1

- premium e billing
- memoria persistente entre sessoes
- personalizacao longitudinal
- perfil historico de treino
- arquitetura orientada primeiro para escala
- plataforma de administracao robusta
- automacao operacional avancada
- stacks que escondam memoria de produto em logs ou analytics
- qualquer uso de `Supabase Postgres` para memoria longitudinal do usuario

## 10. Regras de implementacao derivadas desta decisao

- o estado de sessao deve expirar e nao pode ser reutilizado como memoria funcional em sessoes futuras
- `Redis` deve existir apenas para sessao ativa, nunca para historico do produto
- registros em `Supabase Postgres` devem servir a observacao do piloto, nao a continuidade personalizada do usuario
- a logica de progressao da sessao deve viver na aplicacao, nao em uma plataforma externa de bot
- o acesso ao conhecimento deve ser seletivo e enxuto, nao um motor complexo de busca semantica
- nenhum segredo de `Supabase` deve ser documentado em arquivos versionados

## 11. Proximos passos

Este documento deve servir como base para:

- planejamento de implementacao
- definicao de contratos entre webhook, orquestrador, sessao, conhecimento e geracao
- desenho do schema minimo de eventos operacionais
- definicao das tabelas operacionais em `Supabase Postgres`
- escolha final do provedor de modelo hospedado e dos servicos gerenciados
