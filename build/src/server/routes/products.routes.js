"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configurations_1 = __importDefault(require("../../../configurations"));
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
const authorization_middleware_1 = __importDefault(require("../middlewares/authorization.middleware"));
class ProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getRoutes() {
        return this.router;
    }
    routes() {
        this.router.get(configurations_1.default.SERVER.ROUTES.PRODUCT_GET_MOVEMENTS, authorization_middleware_1.default, products_controller_1.default.getProductMovements);
        this.router.post(configurations_1.default.SERVER.ROUTES.PRODUCT_POST_MOVEMENT, authorization_middleware_1.default, products_controller_1.default.postProductMovement);
        this.router.get(configurations_1.default.SERVER.ROUTES.PRODUCT_GET_MOVEMENT, authorization_middleware_1.default, products_controller_1.default.getProductMovement);
        this.router.get(configurations_1.default.SERVER.ROUTES.PRODUCT_GET_MOVEMENTS_BY_DATES, authorization_middleware_1.default, products_controller_1.default.getProductMovementsByDates);
    }
}
exports.default = new ProductsRoutes().getRoutes();
