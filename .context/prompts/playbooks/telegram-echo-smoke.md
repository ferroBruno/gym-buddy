# Telegram Echo Smoke

## Purpose

Validate that Telegram, tunnel, n8n credentials, and response delivery are working.

## When To Use

Only during infrastructure validation.

## Flow

1. Receive message from Telegram.
2. Extract `chat.id` and `message.text`.
3. Reply to the same `chat_id` with a fixed confirmation.

## Response Shape

```text
Gym Buddy smoke test ativo. Recebi: <user text>
```

## Runtime Limits

No IA call.

No persistence.

No training advice.

No use of raw knowledge.
