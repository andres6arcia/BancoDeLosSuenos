"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../../configurations"));
const product_model_1 = __importDefault(require("./models/product.model"));
const index_datasource_1 = __importDefault(require("./index.datasource"));
const mongoose_1 = __importDefault(require("mongoose"));
class ProductMongo {
    // If mongoose connection is not open, open it
    async checkConnection() {
        if (mongoose_1.default.connection.readyState !== configurations_1.default.DATA_SOURCES.DB_MONGO.STATE_CONEECTED)
            await index_datasource_1.default.connect();
    }
    // Check if id is a valid ObjectId
    isValidId(id) {
        return mongoose_1.default.Types.ObjectId.isValid(id);
    }
    async getById(id) {
        // Check connection is open
        await this.checkConnection();
        // Get product by id and return it
        return await product_model_1.default.findById(id);
    }
    async create(product) {
        // Check connection is open
        await this.checkConnection();
        // Create product
        const productModel = new product_model_1.default(product);
        await productModel.save();
        // Return product
        return productModel;
    }
    async update(product) {
        // Check connection is open
        await this.checkConnection();
        // Update Product
        await product_model_1.default.updateOne({ id: product._id }, product);
        // Return Product
        return product;
    }
}
exports.default = ProductMongo;
