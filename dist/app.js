"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
require("./container");
const config_1 = require("./config/config");
const error_handler_1 = require("./shared/middlewares/error-handler");
const routes_1 = require("./v1/routes");
const app = (0, express_1.default)();
exports.app = app;
app.disable('x-powered-by');
app.set('trust proxy', true);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: config_1.config.security.corsOrigins.includes('*')
        ? true
        : config_1.config.security.corsOrigins,
}));
app.use((0, express_rate_limit_1.default)({
    windowMs: config_1.config.security.rateLimitWindowMs,
    max: config_1.config.security.rateLimitMaxRequests,
    standardHeaders: true,
    legacyHeaders: false,
}));
app.use(express_1.default.json({ limit: '20kb' }));
app.use(express_1.default.urlencoded({ extended: false, limit: '20kb' }));
app.get('/health', (_request, response) => {
    return response.status(200).json({
        success: true,
        message: 'Server is healthy.',
    });
});
app.use('/api/v1', routes_1.v1Router);
app.use(error_handler_1.errorHandler);
