import type { FastifyInstance } from "fastify";
import { SessionService } from "../application/session-service.js";
export declare function registerSessionRoutes(app: FastifyInstance, dependencies: {
    sessionService: SessionService;
}): Promise<void>;
