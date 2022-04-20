"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../../configurations"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_datasource_1 = __importDefault(require("./index.datasource"));
const movement_model_1 = __importDefault(require("./models/movement.model"));
class MovementMongo {
    // If mongoose connection is not open, open it
    async checkConnection() {
        if (mongoose_1.default.connection.readyState !== configurations_1.default.DATA_SOURCES.DB_MONGO.STATE_CONEECTED)
            await index_datasource_1.default.connect();
    }
    // Check if id is a valid ObjectId
    isValidId(id) {
        return mongoose_1.default.Types.ObjectId.isValid(id);
    }
    async getByDates(productId, startDate, endDate) {
        // Check connection is open
        await this.checkConnection();
        // Get all movements
        const movements = await movement_model_1.default.find({ productId, createdAt: { $gte: startDate, $lte: endDate } });
        return movements;
    }
    async getAll(productId) {
        // Check connection is open
        await this.checkConnection();
        // Get all movements
        const movements = await movement_model_1.default.find({ productId });
        return movements;
    }
    async getById(id) {
        // Check connection is open
        await this.checkConnection();
        // Get movement by id and return it
        const movement = await movement_model_1.default.findById(id);
        return movement;
    }
    async create(movement) {
        // Check connection is open
        await this.checkConnection();
        // Create movement
        const movementModel = new movement_model_1.default(movement);
        await movementModel.save();
        // Return movement
        return movementModel;
    }
    async update(movement) {
        // Check connection is open
        await this.checkConnection();
        // Update movement
        await movement_model_1.default.updateOne({ id: movement._id }, movement);
        // Return movement
        return movement;
    }
}
exports.default = MovementMongo;
