# Gym Buddy v1

Arquitetura inicial para validar o Gym Buddy como experiencia conversacional gratuita via Telegram, usando n8n em Docker como orquestrador.

## Escopo atual

- subir uma stack local com n8n e Postgres via Docker Compose
- usar Telegram como canal de mensageria
- manter o n8n como orquestrador principal da v1
- preparar uma fronteira HTTP para o futuro agente de IA especializado em treinamento
- preservar sessoes sem memoria longitudinal entre conversas

## Arquitetura atual

O Gym Buddy v1 esta organizado como um MVP Telegram-first com orquestracao em n8n.

Fluxo principal:

1. O usuario envia uma mensagem para o bot do Telegram.
2. O Telegram entrega a mensagem ao workflow ativo no n8n.
3. O n8n normaliza o texto, identifica a intent, avalia risco e decide a rota.
4. Casos sensiveis, como dor, carga exata ou pedido de memoria, recebem resposta fixa segura.
5. Casos permitidos podem chamar uma LLM local via Ollama, usando apenas contexto curado.
6. Se a LLM falhar ou estiver indisponivel, o workflow usa fallback rule-based.
7. O n8n registra um log tecnico da execucao e envia a resposta de volta pelo Telegram.

Componentes:

- `docker-compose.yml`: sobe Postgres, n8n e servicos opcionais de tunnel e LLM local.
- `postgres`: banco operacional do n8n, usado para dados internos e execucoes.
- `n8n`: orquestrador dos workflows, roteamento, chamadas opcionais de LLM, logs e envio de resposta.
- `cloudflared`: tunnel opcional para expor o webhook do Telegram em HTTPS.
- `ollama`: LLM local opcional para melhorar respostas dentro dos guardrails.
- `.context/workflows/`: exports versionados dos workflows n8n.
- `.context/knowledge/curated/`: cards de conhecimento revisado que podem orientar respostas.
- `.context/prompts/`: guardrails, playbooks, estilo de resposta e casos de avaliacao.
- `.context/docs/`: documentacao de produto, arquitetura, operacao e proximos passos.

Limites importantes:

- Raw Knowledge nao entra diretamente no runtime.
- A v1 nao usa RAG, embeddings, banco vetorial ou sincronizacao com Google Drive.
- O bot nao deve fingir personalizacao profunda nem memoria entre sessoes.
- A LLM ajuda na redacao, mas guardrails e rotas seguras continuam sendo prioridade.

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
