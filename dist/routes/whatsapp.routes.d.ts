import type { FastifyInstance } from "fastify";
export declare function registerWhatsAppRoutes(app: FastifyInstance, dependencies: {
    verifyToken: string;
}): Promise<void>;
