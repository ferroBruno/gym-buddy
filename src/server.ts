import "dotenv/config";

import { createApp } from "./app.js";
import { loadConfig } from "./config/env.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const app = await createApp(config);

  try {
    await app.listen({
      host: "0.0.0.0",
      port: config.port
    });
  } catch (error) {
    app.log.error(error);
    process.exitCode = 1;
  }
}

void main();
