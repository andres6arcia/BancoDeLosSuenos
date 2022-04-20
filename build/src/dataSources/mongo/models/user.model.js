"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const configurations_1 = __importDefault(require("../../../../configurations"));
const UserSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    description: String,
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: configurations_1.default.DATA_SOURCES.MODEL_NAME_PRODUCT }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)(configurations_1.default.DATA_SOURCES.MODEL_NAME_USER, UserSchema, configurations_1.default.DATA_SOURCES.COLLECTION_NAME_USERS);
