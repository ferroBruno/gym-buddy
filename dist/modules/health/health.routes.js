"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHealthRoutes = registerHealthRoutes;
async function registerHealthRoutes(app) {
    app.get("/health", async () => ({
        status: "ok"
    }));
}
//# sourceMappingURL=health.routes.js.map