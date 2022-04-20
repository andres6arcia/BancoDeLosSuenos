"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../../configurations"));
const user_model_1 = __importDefault(require("./models/user.model"));
const index_datasource_1 = __importDefault(require("./index.datasource"));
const mongoose_1 = __importDefault(require("mongoose"));
class UserMongo {
    // If mongoose connection is not open, open it
    async checkConnection() {
        if (mongoose_1.default.connection.readyState !== configurations_1.default.DATA_SOURCES.DB_MONGO.STATE_CONEECTED)
            await index_datasource_1.default.connect();
    }
    async getById(id) {
        // Check connection is open
        await this.checkConnection();
        // Get user by id and return it
        const populateOptions = {
            path: configurations_1.default.DATA_SOURCES.COLLECTION_NAME_PRODUCTS,
            populate: {
                path: configurations_1.default.DATA_SOURCES.POPULATE_FIELD_PRODUCT_TYPE,
                model: configurations_1.default.DATA_SOURCES.MODEL_NAME_PRODUCT_TYPE,
                select: configurations_1.default.DATA_SOURCES.POPULATE_FIELD_PRODUCT_TYPE_SELECT
            },
        };
        const user = await user_model_1.default.findOne({ id }).populate(populateOptions);
        return user;
    }
    async create(user) {
        // Check connection is open
        await this.checkConnection();
        // Create user
        const userModel = new user_model_1.default(user);
        await userModel.save();
        // Return user
        return userModel;
    }
    async update(user) {
        // Check connection is open
        await this.checkConnection();
        // Update user
        await user_model_1.default.updateOne({ id: user.id }, user);
        // Return user
        return user;
    }
}
exports.default = UserMongo;
