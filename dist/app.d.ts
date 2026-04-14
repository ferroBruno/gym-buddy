import { type FastifyInstance } from "fastify";
import type { AppConfig } from "./config/env.js";
export declare function createApp(config: AppConfig): Promise<FastifyInstance>;
