"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const app_error_1 = require("../errors/app-error");
const validateRequest = (dtoClass) => {
    return async (request, _response, next) => {
        const dto = (0, class_transformer_1.plainToInstance)(dtoClass, request.body);
        const errors = await (0, class_validator_1.validate)(dto, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        if (errors.length > 0) {
            const messages = errors
                .flatMap((error) => Object.values(error.constraints || {}))
                .filter(Boolean);
            return next(new app_error_1.AppError(messages.join(', ') || 'Validation failed.', 422));
        }
        request.body = dto;
        return next();
    };
};
exports.validateRequest = validateRequest;
