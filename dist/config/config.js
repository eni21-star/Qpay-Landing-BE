"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const parseOrigins = (value) => {
    if (!value) {
        return ['*'];
    }
    return value
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
};
exports.config = {
    app: {
        env: process.env.NODE_ENV || 'development',
        port: Number(process.env.PORT || 3000),
    },
    database: {
        url: process.env.MONGODB_URL || '',
    },
    auth: {
        headerName: 'x-api-key',
        apiKey: process.env.SERVER_API_KEY || '',
    },
    security: {
        corsOrigins: parseOrigins(process.env.CORS_ORIGINS),
        rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
        rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
    },
};
