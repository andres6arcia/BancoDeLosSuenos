"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_datasource_1 = __importDefault(require("../../dataSources/mongo/user.datasource"));
const product_datasource_1 = __importDefault(require("../../dataSources/mongo/product.datasource"));
const authentication_interactor_1 = __importDefault(require("./authentication.interactor"));
const user_interactor_1 = __importDefault(require("./user.interactor"));
const productType_datasource_1 = __importDefault(require("../../dataSources/mongo/productType.datasource"));
const product_interactor_1 = __importDefault(require("./product.interactor"));
const movement_datasource_1 = __importDefault(require("../../dataSources/mongo/movement.datasource"));
class IndexInteractor {
    constructor() {
        // Create dependencies needed by the interactors
        this.userRepository = new user_datasource_1.default;
        this.productRepository = new product_datasource_1.default;
        this.productTypeRepository = new productType_datasource_1.default;
        this.MovementRepository = new movement_datasource_1.default;
        // Send dependecies to the interactors
        this.authenticationInteractor = new authentication_interactor_1.default(this.userRepository);
        this.userInteractor = new user_interactor_1.default(this.userRepository, this.productRepository, this.productTypeRepository);
        this.productInteractor = new product_interactor_1.default(this.userRepository, this.productRepository, this.MovementRepository);
    }
    isVAlidId(id) {
        return this.productRepository.isValidId(id);
    }
    async signIn(id, password) {
        // Get token from interactor and return it
        return await this.authenticationInteractor.signIn(id, password);
    }
    async createUser(id, name, password) {
        // Create user
        return await this.authenticationInteractor.createUser(id, name, password);
    }
    async createUserProduct(userId, productTypeId, name) {
        // Add product to user
        return await this.userInteractor.createUserProduct(userId, productTypeId, name);
    }
    async getUserProducts(userId) {
        // Add product to user
        return await this.userInteractor.getUserProducts(userId);
    }
    async createUserProductRequest(userId, productTypeId, name) {
        // Add product to user
        return await this.userInteractor.createUserProductRequest(userId, productTypeId, name);
    }
    async createProductMovement(userId, productId, description, value, store, tax) {
        // Create movement
        return await this.productInteractor.createProductMovement(userId, productId, description, value, store, tax);
    }
    async getProductMovements(userId, productId) {
        // Get product movements
        return await this.productInteractor.getProductMovements(userId, productId);
    }
    async getProductMovementsByDates(userId, productId, startDate, endDate) {
        // Get product movements
        return await this.productInteractor.getProductMovementsByDates(userId, productId, startDate, endDate);
    }
    async getProductMovement(userId, productId, movementId) {
        // Get product movement by id
        return await this.productInteractor.getProductMovement(userId, productId, movementId);
    }
}
exports.default = new IndexInteractor();
