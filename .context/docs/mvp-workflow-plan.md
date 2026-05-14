---
type: doc
name: mvp-workflow-plan
description: Plano minimo do workflow MVP do Gym Buddy no n8n via Telegram
category: workflow
generated: 2026-05-13
status: draft
language: pt-BR
---

# MVP Workflow Plan - Gym Buddy

## Objetivo

Criar a primeira versao funcional minima do Gym Buddy no n8n para testar valor rapidamente pelo Telegram.

O MVP deve usar Telegram como canal principal, n8n como orquestrador e Postgres apenas como suporte local do n8n. Nao criar backend, RAG, embeddings, memoria longitudinal, Google Drive runtime, interpretacao de imagem ou tabelas novas nesta etapa.

Workflow versionado:

```text
.context/workflows/030-gym-buddy-mvp-telegram.json
```

## Escopo do workflow

Entrada:

- mensagem de texto recebida pelo Telegram;
- metadados minimos do usuario e chat.

Saida:

- resposta curta no Telegram;
- registro minimo do evento no historico de execucao do n8n;
- classificacao simples de feedback quando o usuario responder algo como `sim`, `nao`, `ajudou`, `nao ajudou`, `positivo` ou `negativo`.

## Fluxo proposto no n8n

1. `Telegram Trigger`
   - Recebe novas mensagens do bot.
   - Aceita apenas mensagens de texto no MVP.
   - Ignora imagens, audio, documentos e stickers com uma resposta curta informando que o MVP entende apenas texto.

2. `Set - Extract Telegram Fields`
   - Extrai os campos minimos:
     - `user_id`: `message.from.id`;
     - `chat_id`: `message.chat.id`;
     - `username`: `message.from.username`;
     - `first_name`: `message.from.first_name`;
     - `message_text`: `message.text`;
     - `message_id`: `message.message_id`;
     - `received_at`: timestamp da execucao ou `message.date` convertido quando conveniente.

3. `IF - Is Feedback`
   - Detecta feedback simples por texto normalizado.
   - Exemplos positivos: `sim`, `ajudou`, `ok`, `boa`, `positivo`.
   - Exemplos negativos: `nao`, `nao ajudou`, `ruim`, `negativo`.
   - Se for feedback, responder sem chamar LLM.

4. `Set - Build LLM Input`
   - Monta o prompt com:
     - system prompt fixo de `.context/prompts/mvp/gym-buddy-system-prompt.md`;
     - mensagem atual do usuario;
     - metadados tecnicos minimos, se necessario.
   - Nao anexar Raw Knowledge.
   - Nao consultar Google Drive.
   - Nao consultar memoria de usuario.

5. `LLM`
   - Chama o modelo configurado por credencial do n8n.
   - Usa o system prompt fixo.
   - Retorna apenas texto final para Telegram.
   - Temperatura sugerida: baixa a moderada, por exemplo `0.2` a `0.5`.

6. `Telegram - Send Message`
   - Envia a resposta para `chat_id`.
   - Usa o texto retornado pelo LLM ou a resposta fixa de feedback.

7. `Set - Minimal Log`
   - Cria um objeto de log na propria execucao do n8n:
     - `channel`;
     - `user_id`;
     - `chat_id`;
     - `username`;
     - `message_id`;
     - `message_text`;
     - `is_feedback`;
     - `feedback_value`;
     - `reply_text`;
     - `received_at`;
     - `handled_at`.
   - Nao criar tabela nova no Postgres nesta fase. O Postgres ja sustenta o n8n e suas execucoes locais.

## Respostas fixas sem LLM

Mensagem nao textual:

```text
Por enquanto eu so consigo responder mensagens de texto. Me diga sua duvida ou o treino que voce quer ajustar.
```

Feedback positivo:

```text
Valeu pelo feedback. Vou manter respostas curtas e praticas por aqui.
```

Feedback negativo:

```text
Obrigado pelo feedback. Me diga em uma frase o que faltou ou o que voce queria ajustar.
```

## Variaveis necessarias

Ambiente local:

- `POSTGRES_USER`;
- `POSTGRES_PASSWORD`;
- `POSTGRES_DB`;
- `N8N_ENCRYPTION_KEY`;
- `N8N_PORT`;
- `N8N_HOST`;
- `N8N_PROTOCOL`;
- `N8N_EDITOR_BASE_URL`;
- `WEBHOOK_URL`;
- `GENERIC_TIMEZONE`;
- `N8N_SECURE_COOKIE`.

Credenciais no n8n:

- Telegram Bot API token;
- credencial do provedor de LLM.

Variaveis ou parametros internos do workflow:

- `SYSTEM_PROMPT`: conteudo versionado em `.context/prompts/mvp/gym-buddy-system-prompt.md`;
- `MODEL_NAME`: modelo selecionado no node de LLM;
- `LLM_TEMPERATURE`: valor sugerido entre `0.2` e `0.5`.

## Como testar manualmente

1. Copiar `.env.example` para `.env` se ainda nao existir.
2. Preencher `POSTGRES_PASSWORD` e manter `N8N_ENCRYPTION_KEY` estavel.
3. Rodar `docker compose config --quiet`.
4. Rodar `docker compose up -d`.
5. Abrir `http://localhost:5678`.
6. Criar as credenciais de Telegram e LLM dentro do n8n.
7. Criar o workflow com os nodes descritos neste plano.
8. Alternativa: importar `.context/workflows/030-gym-buddy-mvp-telegram.json` e selecionar manualmente as credenciais reais nos nodes de Telegram e OpenAI.
9. Configurar `WEBHOOK_URL` e `N8N_EDITOR_BASE_URL` com HTTPS publico quando for testar Telegram webhook real.
10. Ativar o workflow.
11. Enviar os casos de `.context/prompts/evaluation/mvp-manual-test-cases.md` pelo Telegram.
12. Verificar:
    - resposta chega no chat correto;
    - casos de dor ou risco nao recebem diagnostico;
    - pedidos de carga exata nao recebem kg absoluto;
    - pedidos de memoria anterior sao recusados com clareza;
    - feedback simples nao chama LLM;
    - execucoes do n8n contem o log minimo.

## Fora de escopo

- criar RAG;
- criar embeddings;
- criar scripts;
- criar backend;
- criar tabelas novas;
- integrar Google Drive em runtime;
- usar Raw Knowledge diretamente no runtime;
- interpretar imagem;
- adicionar memoria longitudinal.
