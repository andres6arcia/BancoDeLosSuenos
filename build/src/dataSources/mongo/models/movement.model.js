"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const configurations_1 = __importDefault(require("../../../../configurations"));
const MovementSchema = new mongoose_1.Schema({
    productId: { required: true, type: mongoose_1.Schema.Types.ObjectId, ref: configurations_1.default.DATA_SOURCES.MODEL_NAME_PRODUCT },
    value: { type: Number, required: true },
    description: String,
    state: { type: Number, required: true, default: configurations_1.default.DATA_SOURCES.DEFAULT_VALUE_MOVEMENT_STATE_ACTIVE },
    store: String,
    tax: Number,
}, { timestamps: true });
exports.default = (0, mongoose_1.model)(configurations_1.default.DATA_SOURCES.MODEL_NAME_MOVEMENT, MovementSchema, configurations_1.default.DATA_SOURCES.COLLECTION_NAME_MOVEMENTS);
