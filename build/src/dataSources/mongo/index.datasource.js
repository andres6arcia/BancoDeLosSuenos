"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const configurations_1 = __importDefault(require("../../../configurations"));
class MongoDb {
    async connect() {
        // Connect to MongoDB
        await mongoose_1.default.connect(configurations_1.default.DATA_SOURCES.DB_MONGO.URL);
        console.log(configurations_1.default.DATA_SOURCES.DB_MONGO.MESSAGE_DB_CONNECTED);
    }
    isValidId(id) {
        // Check if id is a valid ObjectId
        return mongoose_1.default.Types.ObjectId.isValid(id);
    }
}
exports.default = new MongoDb();
