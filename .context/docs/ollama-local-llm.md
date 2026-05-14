---
type: doc
name: ollama-local-llm
description: Local Ollama setup for the Gym Buddy MVP LLM path
category: workflow
generated: 2026-05-14
status: draft
language: pt-BR
---

# Ollama Local LLM

## Objetivo

Adicionar um provedor LLM local e sem custo por chamada para o Gym Buddy MVP.

O Ollama nao substitui o roteador de seguranca. O fluxo continua assim:

1. Telegram recebe mensagem.
2. n8n extrai campos.
3. roteador tecnico classifica intent e risco.
4. intents conhecidas respondem por rule-based.
5. somente mensagens nao cobertas tentam Ollama.
6. se Ollama falhar ou estiver offline, o bot responde fallback controlado.

## Servico Docker

O `docker-compose.yml` inclui um servico opcional:

```text
ollama
```

Ele usa profile `llm`, entao nao sobe no `docker compose up -d` normal.

Para subir:

```powershell
docker compose --profile llm up -d ollama
```

Para baixar um modelo:

```powershell
docker compose exec ollama ollama pull llama3.2:3b
```

Para listar modelos:

```powershell
docker compose exec ollama ollama list
```

## Variaveis

No `.env`:

```text
OLLAMA_BASE_URL=http://ollama:11434
OLLAMA_MODEL=llama3.2:3b
```

Se o Ollama estiver rodando fora do Docker, na maquina host, use:

```text
OLLAMA_BASE_URL=http://host.docker.internal:11434
```

## Modelo inicial sugerido

Comecar com um modelo pequeno para validar latencia e estabilidade.

Sugestao inicial:

```text
llama3.2:3b
```

Trocar o modelo depois deve ser uma mudanca de variavel, nao uma mudanca no workflow.

## Criterios de aceite

O caminho local esta pronto quando:

- `docker compose config --quiet` passa;
- `ollama list` mostra o modelo baixado;
- o n8n consegue chamar `OLLAMA_BASE_URL`;
- mensagens fora das regras recebem resposta do Ollama;
- mensagens de risco continuam sendo respondidas pelo rule-based;
- se Ollama estiver offline, o Telegram recebe fallback controlado.

## Limites

Nesta etapa, nao adicionar:

- RAG;
- embeddings;
- memoria longitudinal;
- Google Drive runtime;
- backend novo;
- interpretacao de imagem.
