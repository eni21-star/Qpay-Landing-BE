"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashApiKey = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../../config/config");
const hashApiKey = (apiKey) => crypto_1.default
    .createHmac('sha256', config_1.config.auth.apiKeyHashSecret)
    .update(apiKey)
    .digest('hex');
exports.hashApiKey = hashApiKey;
