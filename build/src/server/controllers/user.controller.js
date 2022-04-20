"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../../configurations"));
const index_interactor_1 = __importDefault(require("../../core/interactors/index.interactor"));
class UserController {
    async getUserProducts(req, res) {
        const { userId } = req.params;
        // Validations
        if (!userId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID, products: null });
            return;
        }
        // Get products by user and return it 
        try {
            const products = await index_interactor_1.default.getUserProducts(userId);
            res.status(200).json({ message: configurations_1.default.SERVER.MESSAGES.USER_PRODUCTS_RETRIEVED, products });
        }
        catch (err) {
            res.status(400).json({ message: err.message, products: null });
        }
    }
    async postUserProduct(req, res) {
        const { userId, productTypeId } = req.params;
        const { name } = req.body;
        // Validations
        if (!userId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID, product: null });
            return;
        }
        if (!productTypeId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PRODUCT_TYPE_ID, product: null });
            return;
        }
        // Add new product to user and return it 
        try {
            const product = await index_interactor_1.default.createUserProduct(userId, productTypeId, name);
            res.status(200).json({ message: configurations_1.default.SERVER.MESSAGES.USER_PRODUCT_ADDED, product });
        }
        catch (err) {
            res.status(400).json({ message: err.message, product: null });
        }
    }
    async postUserProductRequest(req, res) {
        const { userId, productTypeId } = req.params;
        const { name } = req.body;
        // Validations
        if (!userId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID, productRequest: null });
            return;
        }
        if (!productTypeId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PRODUCT_TYPE_ID, productRequest: null });
            return;
        }
        // Add new product to user and return it 
        try {
            const productRequest = await index_interactor_1.default.createUserProductRequest(userId, productTypeId, name);
            res.status(200).json({ message: configurations_1.default.SERVER.MESSAGES.USER_PRODUCT_REQUEST_ADDED, productRequest });
        }
        catch (err) {
            res.status(400).json({ message: err.message, productRequest: null });
        }
    }
}
exports.default = new UserController();
