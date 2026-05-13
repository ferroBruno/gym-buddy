---
type: doc
name: workflow-export-conventions
description: Conventions for versioning n8n workflow exports in Gym Buddy
category: workflow
generated: 2026-05-13
status: active
language: pt-BR
---

# n8n Workflow Export Conventions

## Objetivo

Padronizar como workflows do n8n sao salvos em `.context/workflows/` para que o projeto continue simples, revisavel e reproduzivel.

## Diretorio

Workflows versionaveis devem ficar em:

```text
.context/workflows/
```

Arquivos temporarios, payloads gerados automaticamente e saidas descartaveis devem ir para `.context/tmp/` ou `.context/generated/`, que sao ignorados pelo Git.

## Nome de arquivo

Use nomes em kebab-case, com prefixo numerico quando houver ordem operacional:

```text
000-smoke-test-local-webhook.json
010-telegram-echo-smoke.json
020-gym-buddy-session-router.json
```

## O que pode ser versionado

- Estrutura do workflow.
- Nodes e conexoes.
- Parametros nao sensiveis.
- Payloads de exemplo sem dados pessoais.
- Notas operacionais.

## O que nao pode ser versionado

- Tokens do Telegram.
- Chaves de API.
- Credenciais OAuth.
- URLs privadas sensiveis.
- Dados reais de usuarios.
- Historico real de conversas.

## Credenciais

Credenciais devem ser criadas dentro do n8n e referenciadas pelo workflow importado.

Ao exportar um workflow para Git, revise o JSON antes de commitar. O arquivo nao deve conter segredo real.

Para repositorios publicos, remova tambem IDs locais de credenciais do n8n. Use placeholders e documente que a credencial deve ser selecionada manualmente apos a importacao.

## Fluxo recomendado

1. Criar ou alterar workflow no editor do n8n.
2. Testar localmente.
3. Exportar o workflow como JSON.
4. Salvar em `.context/workflows/`.
5. Revisar diff procurando segredos ou dados pessoais.
6. Atualizar a documentacao relacionada em `.context/docs/`.

## Checklist antes de commitar

- O workflow nao contem token real.
- O workflow nao contem ID local real de credencial.
- O workflow nao contem `chat_id` real.
- O workflow nao contem payload real de usuario.
- O workflow nao contem URL temporaria de tunnel.
- O `.env` nao aparece em `git status`.

## Estado inicial

O primeiro workflow versionado e um smoke test local via Webhook. Ele valida o n8n sem depender de Telegram ou URL publica.
