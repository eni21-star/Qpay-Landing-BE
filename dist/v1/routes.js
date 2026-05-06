"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
const express_1 = require("express");
const contact_routes_1 = require("./modules/contact/routes/contact.routes");
const v1Router = (0, express_1.Router)();
exports.v1Router = v1Router;
v1Router.use('/contact', contact_routes_1.contactRoutes);
