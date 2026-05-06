const assert = require("node:assert/strict");
const { createHmac } = require("node:crypto");

const { createApp } = require("../dist/app.js");
const { loadConfig } = require("../dist/config/env.js");

const TEST_SECRET = "test-secret";
const INTERNAL_AUTH_HEADERS = {
  authorization: `Bearer ${TEST_SECRET}`
};

async function run(name, fn) {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

async function createTestApp() {
  return createApp(
    loadConfig({
      NODE_ENV: "test",
      SESSION_STORE_MODE: "memory"
    })
  );
}

function signedJsonPayload(payload) {
  const body = JSON.stringify(payload);
  const signature = `sha256=${createHmac("sha256", TEST_SECRET).update(Buffer.from(body)).digest("hex")}`;

  return {
    body,
    headers: {
      "content-type": "application/json",
      "x-hub-signature-256": signature
    }
  };
}

async function main() {
  await run("GET /health returns ok", async () => {
    const app = await createTestApp();
    const response = await app.inject({
      method: "GET",
      url: "/health"
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), {
      status: "ok"
    });

    await app.close();
  });

  await run("loadConfig rejects memory sessions in production", async () => {
    assert.throws(
      () =>
        loadConfig({
          NODE_ENV: "production",
          WHATSAPP_VERIFY_TOKEN: "verify",
          WHATSAPP_ACCESS_TOKEN: "access",
          WHATSAPP_PHONE_NUMBER_ID: "phone",
          WHATSAPP_APP_SECRET: "secret",
          INTERNAL_API_TOKEN: "internal",
          SESSION_STORE_MODE: "memory"
        }),
      /SESSION_STORE_MODE=redis/
    );
  });

  await run("loadConfig requires rediss Redis URL in production", async () => {
    assert.throws(
      () =>
        loadConfig({
          NODE_ENV: "production",
          WHATSAPP_VERIFY_TOKEN: "verify",
          WHATSAPP_ACCESS_TOKEN: "access",
          WHATSAPP_PHONE_NUMBER_ID: "phone",
          WHATSAPP_APP_SECRET: "secret",
          INTERNAL_API_TOKEN: "internal",
          SESSION_STORE_MODE: "redis",
          REDIS_URL: "redis://localhost:6379"
        }),
      /REDIS_URL must use rediss/
    );
  });

  await run("GET /webhooks/whatsapp verifies Meta challenge", async () => {
    const app = await createTestApp();
    const response = await app.inject({
      method: "GET",
      url: "/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=test-secret&hub.challenge=challenge-value"
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.body, "challenge-value");

    await app.close();
  });

  await run("GET /webhooks/whatsapp rejects invalid verification token", async () => {
    const app = await createTestApp();
    const response = await app.inject({
      method: "GET",
      url: "/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=challenge-value"
    });

    assert.equal(response.statusCode, 403);
    assert.deepEqual(response.json(), {
      error: "webhook verification failed"
    });

    await app.close();
  });

  await run("POST /webhooks/whatsapp normalizes text messages", async () => {
    const app = await createTestApp();
    const payload = signedJsonPayload({
      entry: [
        {
          changes: [
            {
              value: {
                metadata: {
                  phone_number_id: "phone-number-id"
                },
                messages: [
                  {
                    id: "wamid.1",
                    from: "5511999999999",
                    timestamp: "1713120000",
                    type: "text",
                    text: {
                      body: "Oi"
                    }
                  }
                ]
              }
            }
          ]
        }
      ]
    });
    const response = await app.inject({
      method: "POST",
      url: "/webhooks/whatsapp",
      headers: payload.headers,
      payload: payload.body
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), {
      status: "received",
      messages: 1
    });

    await app.close();
  });

  await run("POST /webhooks/whatsapp rejects invalid signatures", async () => {
    const app = await createTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/webhooks/whatsapp",
      headers: {
        "content-type": "application/json",
        "x-hub-signature-256": "sha256=invalid"
      },
      payload: JSON.stringify({ entry: [] })
    });

    assert.equal(response.statusCode, 401);
    assert.deepEqual(response.json(), {
      error: "invalid webhook signature"
    });

    await app.close();
  });

  await run("POST /webhooks/whatsapp deduplicates message ids", async () => {
    const app = await createTestApp();
    const webhookPayload = {
      entry: [
        {
          changes: [
            {
              value: {
                messages: [
                  {
                    id: "wamid.duplicate",
                    from: "5511999999999",
                    type: "text",
                    text: {
                      body: "Oi"
                    }
                  }
                ]
              }
            }
          ]
        }
      ]
    };

    const firstPayload = signedJsonPayload(webhookPayload);
    const firstResponse = await app.inject({
      method: "POST",
      url: "/webhooks/whatsapp",
      headers: firstPayload.headers,
      payload: firstPayload.body
    });
    assert.equal(firstResponse.statusCode, 200);
    assert.equal(firstResponse.json().status, "received");
    assert.equal(firstResponse.json().messages, 1);

    const duplicatePayload = signedJsonPayload(webhookPayload);
    const duplicateResponse = await app.inject({
      method: "POST",
      url: "/webhooks/whatsapp",
      headers: duplicatePayload.headers,
      payload: duplicatePayload.body
    });

    assert.equal(duplicateResponse.statusCode, 200);
    assert.deepEqual(duplicateResponse.json(), {
      status: "duplicate",
      messages: 0
    });

    await app.close();
  });

  await run("POST /webhooks/whatsapp ignores unsupported events", async () => {
    const app = await createTestApp();
    const payload = signedJsonPayload({
      entry: [
        {
          changes: [
            {
              value: {
                statuses: [
                  {
                    id: "wamid.1",
                    status: "sent"
                  }
                ]
              }
            }
          ]
        }
      ]
    });
    const response = await app.inject({
      method: "POST",
      url: "/webhooks/whatsapp",
      headers: payload.headers,
      payload: payload.body
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), {
      status: "ignored"
    });

    await app.close();
  });

  await run("POST /session/start returns the opening session payload", async () => {
    const app = await createTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/session/start",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {
        channelUserId: "whatsapp:+5511999999999"
      }
    });

    const body = response.json();

    assert.equal(response.statusCode, 201);
    assert.equal(typeof body.sessionId, "string");
    assert.equal(body.stage, "collecting_goal");
    assert.match(body.message, /AI guide/i);
    assert.match(body.message, /general, non-personalized workout guidance/i);
    assert.match(body.message, /not personalized coaching/i);
    assert.match(body.message, /no memory carried into a future workout/i);
    assert.match(body.nextPrompt, /warm-up/i);

    await app.close();
  });

  await run("POST /session/start rejects missing internal auth", async () => {
    const app = await createTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/session/start",
      payload: {
        channelUserId: "whatsapp:+5511999999999"
      }
    });

    assert.equal(response.statusCode, 401);
    assert.deepEqual(response.json(), {
      error: "unauthorized"
    });

    await app.close();
  });

  await run("POST /session/start rejects requests without channelUserId", async () => {
    const app = await createTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/session/start",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {}
    });

    assert.equal(response.statusCode, 400);
    assert.deepEqual(response.json(), {
      error: "invalid request"
    });

    await app.close();
  });

  await run("POST /session/message advances onboarding into the first guided step", async () => {
    const app = await createTestApp();
    const startResponse = await app.inject({
      method: "POST",
      url: "/session/start",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {
        channelUserId: "whatsapp:+5511999999999"
      }
    });

    const startBody = startResponse.json();
    const goalResponse = await app.inject({
      method: "POST",
      url: "/session/message",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {
        sessionId: startBody.sessionId,
        message: "quick full-body session"
      }
    });

    assert.equal(goalResponse.statusCode, 200);
    assert.equal(goalResponse.json().stage, "collecting_time");
    assert.equal(goalResponse.json().context, undefined);
    assert.match(goalResponse.json().nextPrompt, /minutes/i);

    const timeResponse = await app.inject({
      method: "POST",
      url: "/session/message",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {
        sessionId: startBody.sessionId,
        message: "12 minutes"
      }
    });

    const timeBody = timeResponse.json();
    assert.equal(timeResponse.statusCode, 200);
    assert.equal(timeBody.stage, "first_step_active");
    assert.equal(timeBody.context, undefined);
    assert.match(timeBody.message, /Step 1:/);
    assert.match(timeBody.message, /full body/i);
    assert.match(timeBody.nextPrompt, /Reply 'done'/i);

    await app.close();
  });

  await run("POST /session/message continues after the first guided step using only session context", async () => {
    const app = await createTestApp();
    const startResponse = await app.inject({
      method: "POST",
      url: "/session/start",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {
        channelUserId: "whatsapp:+5511999999999"
      }
    });

    const sessionId = startResponse.json().sessionId;

    await app.inject({
      method: "POST",
      url: "/session/message",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {
        sessionId,
        message: "warm-up"
      }
    });

    await app.inject({
      method: "POST",
      url: "/session/message",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {
        sessionId,
        message: "20"
      }
    });

    const continuationResponse = await app.inject({
      method: "POST",
      url: "/session/message",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {
        sessionId,
        message: "done"
      }
    });

    const continuationBody = continuationResponse.json();
    assert.equal(continuationResponse.statusCode, 200);
    assert.equal(continuationBody.stage, "continuation_step_active");
    assert.equal(continuationBody.context, undefined);
    assert.match(continuationBody.message, /Step 2:/);
    assert.match(continuationBody.nextPrompt, /step 2/i);

    await app.close();
  });

  await run("POST /session/message asks again when time is missing", async () => {
    const app = await createTestApp();
    const startResponse = await app.inject({
      method: "POST",
      url: "/session/start",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {
        channelUserId: "whatsapp:+5511999999999"
      }
    });

    const sessionId = startResponse.json().sessionId;

    await app.inject({
      method: "POST",
      url: "/session/message",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {
        sessionId,
        message: "get moving"
      }
    });

    const timeResponse = await app.inject({
      method: "POST",
      url: "/session/message",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {
        sessionId,
        message: "not sure"
      }
    });

    assert.equal(timeResponse.statusCode, 200);
    assert.equal(timeResponse.json().stage, "collecting_time");
    assert.match(timeResponse.json().nextPrompt, /like 10, 20, or 30/i);

    await app.close();
  });

  await run("POST /session/message rejects unknown sessions", async () => {
    const app = await createTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/session/message",
      headers: INTERNAL_AUTH_HEADERS,
      payload: {
        sessionId: "missing-session",
        message: "done"
      }
    });

    assert.equal(response.statusCode, 404);
    assert.deepEqual(response.json(), {
      error: "sessionId was not found"
    });

    await app.close();
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
