"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_error_1 = require("../errors/app-error");
const errorHandler = (error, _request, response, _next) => {
    if (error instanceof app_error_1.AppError) {
        return response.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
    if (error instanceof mongoose_1.default.Error) {
        return response.status(400).json({
            success: false,
            message: 'Database request failed.',
        });
    }
    return response.status(500).json({
        success: false,
        message: 'Internal server error.',
    });
};
exports.errorHandler = errorHandler;
