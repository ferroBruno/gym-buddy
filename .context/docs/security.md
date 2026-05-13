---
type: doc
name: security
description: Security policies, authentication, secrets management, and compliance requirements
category: security
generated: 2026-05-13
status: filled
language: pt-BR
---

# Security & Compliance Notes - Gym Buddy v1

## 1. Objetivo

Esta politica define os controles minimos de seguranca para a rota atual do Gym Buddy v1: `n8n` em Docker, Telegram como canal e um futuro core de IA integrado por HTTP ou subworkflow.

## 2. Principios obrigatorios

- Nunca armazenar segredos reais em arquivos versionados.
- Tratar tokens do Telegram, chaves de IA e senhas como segredos.
- Usar credenciais criptografadas do n8n sempre que possivel.
- Persistir apenas dados tecnicos e operacionais necessarios.
- Nao criar memoria longitudinal do usuario.
- Validar entrada externa antes de chamar o agente.
- Evitar logs com mensagens completas, tokens ou dados sensiveis.

## 3. Segredos e variaveis de ambiente

Segredos devem existir apenas no `.env` local, em variaveis do runtime ou nas credenciais do n8n:

- `TELEGRAM_BOT_TOKEN`
- `N8N_ENCRYPTION_KEY`
- `POSTGRES_PASSWORD`
- `AI_AGENT_API_TOKEN`
- chaves de provedor de IA quando forem definidas

Arquivos versionados podem conter apenas placeholders como `change-me`.

## 4. Telegram

O workflow deve:

- usar credencial do Telegram no n8n
- evitar expor token em nodes, logs ou documentacao
- registrar `chat_id` apenas quando necessario para operacao
- evitar persistir mensagens completas sem justificativa
- responder apenas a eventos esperados pelo workflow

## 5. n8n

O n8n deve:

- usar `N8N_ENCRYPTION_KEY` forte e estavel
- armazenar dados em Postgres local ou equivalente configurado
- limitar acesso ao editor do n8n ao operador do projeto
- manter workflows simples e auditaveis
- separar credenciais de parametros de negocio

## 6. Futuro core de IA

Quando o core do agente existir, a chamada HTTP deve:

- exigir token interno ou mecanismo equivalente
- aceitar payload minimo e validado
- nao retornar estado interno desnecessario
- nao receber historico longo de conversas antigas
- manter respostas dentro dos limites de orientacao geral

## 7. Dados e memoria

Persistencia permitida:

- configuracoes internas do n8n
- credenciais criptografadas
- historico tecnico de execucoes
- eventos operacionais leves

Persistencia proibida:

- memoria funcional entre sessoes
- historico de treino usado para personalizacao
- perfil longitudinal do usuario
- continuidade automatica entre conversas

## 8. Checklist para mudancas futuras

- O workflow evita segredos em texto claro?
- O payload externo foi normalizado antes de chamar o agente?
- O dado salvo e operacional, nao memoria funcional?
- Logs evitam tokens e conteudo sensivel?
- O core de IA, se chamado, exige autenticacao interna?
- A mudanca ainda preserva free-only, sessao atual e ausencia de memoria?

## 9. Checklist para exports do n8n

Antes de commitar workflows exportados:

- Remover tokens reais.
- Remover IDs locais reais de credenciais.
- Remover URLs temporarias de tunnel.
- Remover `chat_id` real.
- Remover payloads reais de usuario.
- Manter credenciais como placeholders e remapear manualmente no n8n apos importacao.
