---
type: doc
name: security
description: Security policies, authentication, secrets management, and compliance requirements
category: security
generated: 2026-04-14
status: filled
scaffoldVersion: "2.0.0"
language: pt-BR
---

# Security & Compliance Notes - Gym Buddy v1

## 1. Objetivo

Esta politica define os controles minimos de seguranca para o backend v1 do Gym Buddy. Ela protege o escopo WhatsApp-first, o estado efemero de sessao, os segredos de integracao e a separacao obrigatoria entre `Redis` e `Supabase Postgres`.

## 2. Principios Obrigatorios

- Nunca armazenar segredos em arquivos versionados.
- Nunca usar `Supabase Postgres` como memoria funcional do usuario.
- Manter `Redis` exclusivamente para estado ativo de sessao com TTL curto.
- Tratar telefone, identificadores de canal e mensagens como dados sensiveis.
- Expor apenas endpoints necessarios para o slice atual.
- Validar toda entrada externa antes de processar.
- Registrar eventos operacionais sem vazar dados pessoais ou tokens.

## 3. Segredos E Variaveis De Ambiente

Segredos devem existir apenas em variaveis de ambiente do runtime:

- `WHATSAPP_VERIFY_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_APP_SECRET`
- `INTERNAL_API_TOKEN`
- `REDIS_URL`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_DATABASE_URL`
- `LLM_API_KEY`, quando a camada de modelo for implementada

Arquivos permitidos no repositorio podem conter apenas placeholders como `change-me` ou valores vazios. Nenhum token real, password, connection string com password ou chave de API deve ser commitado.

## 4. Webhook WhatsApp

O `POST /webhooks/whatsapp` deve:

- exigir assinatura Meta `X-Hub-Signature-256`
- calcular HMAC SHA-256 sobre o corpo bruto da requisicao usando `WHATSAPP_APP_SECRET`
- rejeitar assinatura ausente ou invalida com `401`
- aplicar limite basico de taxa
- deduplicar `messageId` para reduzir replay e retries duplicados
- aceitar apenas eventos suportados pelo parser
- registrar identificador de origem apenas em formato mascarado ou hash

O `GET /webhooks/whatsapp` pode validar o desafio de assinatura do setup usando `WHATSAPP_VERIFY_TOKEN`, mas nao deve registrar o token recebido.

## 5. Endpoints Internos

`POST /session/start` e `POST /session/message` sao endpoints internos do slice atual. Eles devem:

- exigir `INTERNAL_API_TOKEN` via `Authorization: Bearer <token>` ou `x-internal-api-token`
- aplicar validacao de schema no body
- rejeitar payloads extras ou malformados
- aplicar limite basico de taxa
- nao retornar contexto interno da sessao para consumidores externos

Quando o fluxo WhatsApp estiver conectado ao orquestrador, esses endpoints devem continuar como superficie tecnica controlada ou serem substituidos por chamadas internas sem exposicao publica.

## 6. Estado De Sessao

`Redis`:

- deve ser usado para estado ativo e efemero da sessao
- deve ter TTL configurado por `REDIS_TTL_SECONDS`
- deve usar `rediss://` em producao
- nao deve guardar historico funcional, preferencias persistentes ou progresso entre sessoes
- deve validar payloads lidos antes de usa-los

`SESSION_STORE_MODE=memory` e permitido apenas para desenvolvimento local e testes. Em producao, `SESSION_STORE_MODE=redis` e obrigatorio.

## 7. Persistencia Operacional

`Supabase Postgres` pode armazenar apenas registros tecnicos e operacionais do piloto, como inicio e encerramento de sessao, friccoes e sinais agregados. Esses dados nao podem ser consultados para personalizar sessoes futuras, reconstruir historico do usuario ou alimentar continuidade funcional.

Qualquer schema novo em `Supabase Postgres` deve declarar explicitamente se o dado e operacional, tecnico ou de observabilidade. Dados funcionais de memoria entre sessoes continuam fora de escopo da v1.

## 8. Logs E Dados Sensiveis

Logs devem:

- evitar telefone, tokens, mensagens completas e connection strings
- usar hash ou mascara para identificadores de canal
- registrar eventos tecnicos de forma estruturada
- nao incluir `Authorization`, `WHATSAPP_ACCESS_TOKEN`, `SUPABASE_DATABASE_URL` ou `REDIS_URL`

Eventos permitidos incluem verificacao falha do webhook, mensagem recebida com `messageId`, origem mascarada, duplicata ignorada e payload sem evento suportado.

## 9. Validacao De Entrada

Toda rota deve ter limites claros para:

- campos obrigatorios
- tamanho maximo de strings
- propriedades adicionais
- formato esperado de tokens, ids e mensagens
- tamanho maximo do corpo HTTP

Falhas de validacao devem retornar erro generico suficiente para o cliente corrigir a requisicao sem expor detalhes internos.

## 10. Dependencias E Qualidade

Antes de abrir PR ou entregar mudancas de seguranca, executar:

```bash
npm run lint
npm run test
npm audit --audit-level=moderate
```

Antes de shipping, executar tambem:

```bash
npm run build
```

Novas dependencias devem ser justificadas por reducao real de risco ou simplicidade operacional, e devem passar por `npm audit`.

## 11. Fora De Escopo Da v1

- autenticacao de usuario final
- contas, perfis ou historico longitudinal
- premium, billing ou monetizacao
- analytics detalhado de comportamento individual
- memoria funcional entre sessoes
- uso de `Supabase Postgres` para personalizacao

## 12. Checklist Para Mudancas Futuras

- O endpoint novo tem autenticacao ou justificativa para ser publico?
- O payload externo tem schema e limite de tamanho?
- Logs evitam PII e segredos?
- O dado salvo e operacional, nao memoria funcional?
- Redis continua efemero e com TTL?
- Testes cobrem caso negativo de seguranca?
- `npm run lint`, `npm run test`, `npm audit --audit-level=moderate` e `npm run build` passam?
