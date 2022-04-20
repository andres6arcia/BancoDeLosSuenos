"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../../configurations"));
class UserInteractor {
    constructor(user, product, productType) {
        this.userRepository = user;
        this.productRepository = product;
        this.productTypeRespository = productType;
    }
    async createUserProduct(userId, productTypeId, name) {
        let user, productType;
        // Get user by id
        user = await this.userRepository.getById(userId);
        if (!user)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_USER_NOT_FOUND);
        // Get productType by id
        productType = await this.productTypeRespository.getById(productTypeId);
        if (!productType)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_TYPE_NOT_FOUND);
        // Create a new product of the productType for the user
        let product = { name, type: productType._id.toString() }; // toString() because mongoose returns an ObjectId
        product = await this.productRepository.create(product);
        // Add new product to user
        user.products.push(product._id.toString()); // toString() because mongoose returns an ObjectId
        // Update user
        user = await this.userRepository.update(user);
        return product;
    }
    async getUserProducts(userId) {
        let userPopulated;
        // Get user by id
        userPopulated = await this.userRepository.getById(userId);
        if (!userPopulated)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_USER_NOT_FOUND);
        // Extract product from user
        let products = [];
        userPopulated.products.map((x) => {
            let product = { id: x._id, name: x.name, state: x.state, type: x.type.description, createdAt: x.createdAt, updatedAt: x.updatedAt };
            products.push(product);
        });
        return products;
    }
    async createUserProductRequest(userId, productTypeId, name) {
        let user, productType;
        // Get user by id
        user = await this.userRepository.getById(userId);
        if (!user)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_USER_NOT_FOUND);
        // Get productType by id
        productType = await this.productTypeRespository.getById(productTypeId);
        if (!productType)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_PRODUCT_TYPE_NOT_FOUND);
        // Create a new product of the productType for the user
        let product = { name, state: configurations_1.default.CORE.VALUES.USER_PRODUCT_STATE_PENDING, type: productType._id.toString() }; // toString() because mongoose returns an ObjectId
        product = await this.productRepository.create(product);
        // Add new product to user
        user.products.push(product._id.toString()); // toString() because mongoose returns an ObjectId
        // Update user
        user = await this.userRepository.update(user);
        return product;
    }
}
exports.default = UserInteractor;
