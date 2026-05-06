"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
const connectDatabase = async () => {
    if (!config_1.config.database.url) {
        throw new Error('MONGODB_URL is required.');
    }
    mongoose_1.default.set('strictQuery', true);
    await mongoose_1.default.connect(config_1.config.database.url);
};
exports.connectDatabase = connectDatabase;
