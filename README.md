# Gym Buddy v1

Arquitetura inicial para validar o Gym Buddy como experiencia conversacional gratuita via Telegram, usando n8n em Docker como orquestrador.

## Escopo atual

- subir uma stack local com n8n e Postgres via Docker Compose
- usar Telegram como canal de mensageria
- manter o n8n como orquestrador principal da v1
- preparar uma fronteira HTTP para o futuro agente de IA especializado em treinamento
- preservar sessoes sem memoria longitudinal entre conversas

## Requisitos

- Docker
- Docker Compose
- um bot do Telegram criado via BotFather

## Run locally

```bash
cp .env.example .env
docker compose config --quiet
docker compose up -d
```

O n8n inicia em:

```text
http://localhost:5678
```

## Configuracao inicial no n8n

1. Acesse `http://localhost:5678`.
2. Crie o usuario local do n8n.
3. Crie uma credencial do Telegram usando o token do BotFather.
4. Importe ou crie workflows a partir de `.context/workflows/`.
5. Remapeie credenciais reais dentro do n8n quando importar templates versionados.
6. Teste primeiro os smoke workflows antes de evoluir o core.

Os guias atuais estao em `.context/docs/README.md`.

## Variaveis principais

- `N8N_HOST`
- `N8N_PORT`
- `WEBHOOK_URL`
- `N8N_ENCRYPTION_KEY`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`

Tokens reais e senhas devem ficar apenas no `.env` local ou nas credenciais criptografadas do n8n.
