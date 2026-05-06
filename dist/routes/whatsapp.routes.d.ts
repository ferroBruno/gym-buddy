import type { FastifyInstance } from "fastify";
export declare function registerWhatsAppRoutes(app: FastifyInstance, dependencies: {
    appSecret: string;
    verifyToken: string;
}): Promise<void>;
