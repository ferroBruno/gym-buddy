---
type: doc
name: local-setup
description: Local setup guide for the Gym Buddy n8n and Postgres stack
category: tooling
generated: 2026-05-13
status: active
language: pt-BR
---

# Local Setup - Gym Buddy

## Objetivo

Este guia descreve o setup local minimo do Gym Buddy usando apenas `n8n` e `Postgres` via Docker Compose.

## Pre-requisitos

- Docker Desktop em execucao.
- Arquivo `.env` criado a partir de `.env.example`.
- `POSTGRES_PASSWORD` definido no `.env`.
- `N8N_ENCRYPTION_KEY` definido no `.env` com pelo menos 32 caracteres.

## Comandos

Validar a configuracao:

```bash
docker compose config --quiet
```

Subir a stack:

```bash
docker compose up -d
```

Verificar containers:

```bash
docker compose ps
```

Acessar o n8n:

```text
http://localhost:5678
```

## Regra importante sobre a chave do n8n

Depois de criar credenciais ou workflows com credenciais, nao altere `N8N_ENCRYPTION_KEY`.

O n8n usa essa chave para criptografar credenciais salvas. Se a chave mudar, dados persistidos no volume `n8n_data` podem deixar de abrir corretamente.

## Primeiro setup limpo

Se a stack foi inicializada antes com outra senha ou outra chave, pode ser necessario recriar os volumes locais.

Use isso apenas quando for aceitavel apagar os dados locais do n8n e do Postgres:

```bash
docker compose down -v
docker compose up -d
```

## Escopo protegido

Nao adicionar backend Node, Fastify, Redis, WhatsApp, Supabase, banco vetorial ou infraestrutura extra sem decisao explicita.
