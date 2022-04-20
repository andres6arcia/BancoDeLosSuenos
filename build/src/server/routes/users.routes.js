"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configurations_1 = __importDefault(require("../../../configurations"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authorization_middleware_1 = __importDefault(require("../middlewares/authorization.middleware"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getRoutes() {
        return this.router;
    }
    routes() {
        this.router.get(configurations_1.default.SERVER.ROUTES.USER_GET_PRODUCTS, authorization_middleware_1.default, user_controller_1.default.getUserProducts);
        this.router.post(configurations_1.default.SERVER.ROUTES.USER_POST_PRODUCT, authorization_middleware_1.default, user_controller_1.default.postUserProduct);
        this.router.post(configurations_1.default.SERVER.ROUTES.USER_POST_PRODUCT_REQUEST, authorization_middleware_1.default, user_controller_1.default.postUserProductRequest);
    }
}
exports.default = new UserRoutes().getRoutes();
