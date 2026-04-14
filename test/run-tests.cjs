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
    assert.equal(body.stage, "collecting_goal");
    assert.match(body.message, /AI guide/i);
    assert.match(body.message, /general, non-personalized workout guidance/i);
    assert.match(body.message, /not personalized coaching/i);
    assert.match(body.message, /no memory carried into a future workout/i);
    assert.match(body.nextPrompt, /warm-up/i);

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

  await run("POST /session/message advances onboarding into the first guided step", async () => {
    const app = await createTestApp();
    const startResponse = await app.inject({
      method: "POST",
      url: "/session/start",
      payload: {
        channelUserId: "whatsapp:+5511999999999"
      }
    });

    const startBody = startResponse.json();
    const goalResponse = await app.inject({
      method: "POST",
      url: "/session/message",
      payload: {
        sessionId: startBody.sessionId,
        message: "quick full-body session"
      }
    });

    assert.equal(goalResponse.statusCode, 200);
    assert.equal(goalResponse.json().stage, "collecting_time");
    assert.equal(goalResponse.json().context.broadGoal, "quick_full_body");
    assert.match(goalResponse.json().nextPrompt, /minutes/i);

    const timeResponse = await app.inject({
      method: "POST",
      url: "/session/message",
      payload: {
        sessionId: startBody.sessionId,
        message: "12 minutes"
      }
    });

    const timeBody = timeResponse.json();
    assert.equal(timeResponse.statusCode, 200);
    assert.equal(timeBody.stage, "first_step_active");
    assert.equal(timeBody.context.availableTimeMinutes, 12);
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
      payload: {
        channelUserId: "whatsapp:+5511999999999"
      }
    });

    const sessionId = startResponse.json().sessionId;

    await app.inject({
      method: "POST",
      url: "/session/message",
      payload: {
        sessionId,
        message: "warm-up"
      }
    });

    await app.inject({
      method: "POST",
      url: "/session/message",
      payload: {
        sessionId,
        message: "20"
      }
    });

    const continuationResponse = await app.inject({
      method: "POST",
      url: "/session/message",
      payload: {
        sessionId,
        message: "done"
      }
    });

    const continuationBody = continuationResponse.json();
    assert.equal(continuationResponse.statusCode, 200);
    assert.equal(continuationBody.stage, "continuation_step_active");
    assert.equal(continuationBody.context.broadGoal, "warm_up");
    assert.equal(continuationBody.context.availableTimeMinutes, 20);
    assert.match(continuationBody.message, /Step 2:/);
    assert.match(continuationBody.nextPrompt, /step 2/i);

    await app.close();
  });

  await run("POST /session/message asks again when time is missing", async () => {
    const app = await createTestApp();
    const startResponse = await app.inject({
      method: "POST",
      url: "/session/start",
      payload: {
        channelUserId: "whatsapp:+5511999999999"
      }
    });

    const sessionId = startResponse.json().sessionId;

    await app.inject({
      method: "POST",
      url: "/session/message",
      payload: {
        sessionId,
        message: "get moving"
      }
    });

    const timeResponse = await app.inject({
      method: "POST",
      url: "/session/message",
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
