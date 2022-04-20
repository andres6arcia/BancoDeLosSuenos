"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configurations_1 = __importDefault(require("../../../configurations"));
const authentication_controller_1 = __importDefault(require("../controllers/authentication.controller"));
class AuthenticationRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getRoutes() {
        return this.router;
    }
    routes() {
        this.router.post(configurations_1.default.SERVER.ROUTES.SIGN_IN, authentication_controller_1.default.signIn);
        this.router.post(configurations_1.default.SERVER.ROUTES.CREATE_USER, authentication_controller_1.default.createUser);
    }
}
exports.default = new AuthenticationRoutes().getRoutes();
