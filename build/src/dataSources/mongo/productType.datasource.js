"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../../configurations"));
const index_datasource_1 = __importDefault(require("./index.datasource"));
const mongoose_1 = __importDefault(require("mongoose"));
const productType_model_1 = __importDefault(require("./models/productType.model"));
class ProductTypeMongo {
    // If mongoose connection is not open, open it
    async checkConnection() {
        if (mongoose_1.default.connection.readyState !== configurations_1.default.DATA_SOURCES.DB_MONGO.STATE_CONEECTED)
            await index_datasource_1.default.connect();
    }
    async getById(id) {
        // Check connection is open
        await this.checkConnection();
        // Get the productType by id and return it
        return await productType_model_1.default.findOne({ id });
    }
    async create(productType) {
        // Check connection is open
        await this.checkConnection();
        // Create productType
        const productTypeModel = new productType_model_1.default(productType);
        await productTypeModel.save();
        // Return productType
        return productTypeModel;
    }
    async update(productType) {
        // Check connection is open
        await this.checkConnection();
        // Update productType
        await productType_model_1.default.updateOne({ id: productType.id }, productType);
        // Return productType
        return productType;
    }
}
exports.default = ProductTypeMongo;
