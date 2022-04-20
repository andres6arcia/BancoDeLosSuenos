"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../dataSources/mongo/models/product.model"));
class ProductsController {
    // This method won't be used, instead I will use populate on user model
    async getProducts(req, res) {
        // TODO: Check if error occurs
        // TODO: Ask for the user id
        const accounts = await product_model_1.default.find();
        res.json(accounts);
    }
    async putProduct(req, res) {
        const { name, type, description } = req.body;
        // Validate parameters
        // TODO: Validate parameters
        // TODO: Chech if error occurs 
        // TODO: Add the account ID to the user
        let newProduct = new product_model_1.default({ name, type, description });
        newProduct = await newProduct.save();
        res.json({ message: 'Product saved', data: newProduct });
    }
}
exports.default = new ProductsController();
