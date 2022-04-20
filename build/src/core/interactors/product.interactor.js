"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../../configurations"));
class ProductInteractor {
    constructor(user, product, movement) {
        this.userRepository = user;
        this.productRepository = product;
        this.movementRepository = movement;
    }
    async createProductMovement(userId, productId, description, value, store, tax) {
        let user, product, movement;
        // Get user by id
        user = await this.userRepository.getById(userId);
        if (!user)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_USER_NOT_FOUND);
        // Check if productId is valid
        if (!this.productRepository.isValidId(productId))
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND);
        // Get product by id
        product = await this.productRepository.getById(productId);
        if (!product)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND);
        // Check if product is in user's products
        if (!user.products.find((x) => x._id.toString() === productId))
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND_ON_USER);
        // Create a new movement for the user product
        movement = { productId, description, value, store, tax };
        movement = await this.movementRepository.create(movement);
        return movement;
    }
    async getProductMovementsByDates(userId, productId, startDate, endDate) {
        let user, product, movements;
        // Get user by id
        user = await this.userRepository.getById(userId);
        if (!user)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_USER_NOT_FOUND);
        // Check if productId is valid
        if (!this.productRepository.isValidId(productId))
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND);
        // Get product by id
        product = await this.productRepository.getById(productId);
        if (!product)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND);
        // Check if product is in user's products
        if (!user.products.find((x) => x._id.toString() === productId))
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND_ON_USER);
        // Get movements for the product
        movements = await this.movementRepository.getByDates(productId, startDate, endDate);
        return movements;
    }
    async getProductMovements(userId, productId) {
        let user, product, movements;
        // Get user by id
        user = await this.userRepository.getById(userId);
        if (!user)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_USER_NOT_FOUND);
        // Check if productId is valid
        if (!this.productRepository.isValidId(productId))
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND);
        // Get product by id
        product = await this.productRepository.getById(productId);
        if (!product)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND);
        // Check if product is in user's products
        if (!user.products.find((x) => x._id.toString() === productId))
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND_ON_USER);
        // Get movements for the product
        movements = await this.movementRepository.getAll(productId);
        return movements;
    }
    async getProductMovement(userId, productId, movementId) {
        let user, product, movement;
        // Get user by id
        user = await this.userRepository.getById(userId);
        if (!user)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_USER_NOT_FOUND);
        // Check if productId is valid
        if (!this.productRepository.isValidId(productId))
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND);
        // Get product by id
        product = await this.productRepository.getById(productId);
        if (!product)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND);
        // Check if product is in user's products
        if (!user.products.find((x) => x._id.toString() === productId))
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND_ON_USER);
        // Check if movementId is valid
        if (!this.movementRepository.isValidId(movementId))
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_MOVEMENT_NOT_FOUND);
        // Get movements for the product
        movement = await this.movementRepository.getById(movementId);
        if (!movement)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_MOVEMENT_NOT_FOUND);
        // Check if movement is from user's product
        if (movement.productId.toString() !== productId)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_MOVEMENT_NOT_FOUND_ON_PRODUCT);
        return movement;
    }
}
exports.default = ProductInteractor;
