"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSubmissionModel = void 0;
const mongoose_1 = require("mongoose");
const contactSubmissionSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 255,
        index: true,
    },
    question: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
    sourceIp: {
        type: String,
        default: null,
    },
    userAgent: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.ContactSubmissionModel = (0, mongoose_1.model)('ContactSubmission', contactSubmissionSchema);
