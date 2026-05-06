"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const tsyringe_1 = require("tsyringe");
const contact_service_1 = require("../services/contact.service");
let ContactController = class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
        this.createContact = async (request, response) => {
            const submission = await this.contactService.createContact({
                email: request.body.email,
                question: request.body.question,
                sourceIp: request.ip || null,
                userAgent: request.get('user-agent') || null,
            });
            return response.status(201).json({
                success: true,
                message: 'Question submitted successfully.',
                data: {
                    id: String(submission._id),
                    email: submission.email,
                    question: submission.question,
                    createdAt: submission.createdAt,
                },
            });
        };
    }
};
exports.ContactController = ContactController;
exports.ContactController = ContactController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(contact_service_1.ContactService)),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
