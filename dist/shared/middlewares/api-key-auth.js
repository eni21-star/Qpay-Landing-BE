"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyAuthMiddleware = void 0;
const tsyringe_1 = require("tsyringe");
const config_1 = require("../../config/config");
const app_error_1 = require("../errors/app-error");
let ApiKeyAuthMiddleware = class ApiKeyAuthMiddleware {
    constructor() {
        this.handle = async (request, _response, next) => {
            const rawApiKey = request.header(config_1.config.auth.headerName)?.trim();
            console.log(rawApiKey);
            if (!rawApiKey) {
                return next(new app_error_1.AppError('Missing API key.', 401));
            }
            const requestApiKey = rawApiKey.split(" ")[1].trim();
            console.log(requestApiKey);
            if (!config_1.config.auth.apiKey) {
                return next(new app_error_1.AppError('Server API key is not configured.', 500));
            }
            if (requestApiKey !== config_1.config.auth.apiKey) {
                return next(new app_error_1.AppError('Invalid API key.', 401));
            }
            return next();
        };
    }
};
exports.ApiKeyAuthMiddleware = ApiKeyAuthMiddleware;
exports.ApiKeyAuthMiddleware = ApiKeyAuthMiddleware = __decorate([
    (0, tsyringe_1.injectable)()
], ApiKeyAuthMiddleware);
