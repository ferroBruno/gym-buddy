const assert = require("node:assert/strict");

const { createApp } = require("../dist/app.js");
const { loadConfig } = require("../dist/config/env.js");

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

  await run("POST /session/start returns the opening session payload", async () => {
    const app = await createTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/session/start",
      payload: {
        channelUserId: "whatsapp:+5511999999999"
      }
    });

    const body = response.json();

    assert.equal(response.statusCode, 201);
    assert.equal(typeof body.sessionId, "string");
    assert.equal(body.stage, "guided_session_ready");
    assert.match(body.message, /AI guide/i);
    assert.match(body.message, /general, non-personalized workout guidance/i);
    assert.match(body.message, /not personalized coaching/i);
    assert.match(body.message, /no memory carried into a future workout/i);
    assert.match(body.nextPrompt, /today's workout/i);

    await app.close();
  });

  await run("POST /session/start rejects requests without channelUserId", async () => {
    const app = await createTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/session/start",
      payload: {}
    });

    assert.equal(response.statusCode, 400);
    assert.deepEqual(response.json(), {
      error: "channelUserId is required"
    });

    await app.close();
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
