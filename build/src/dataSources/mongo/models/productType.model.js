"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const configurations_1 = __importDefault(require("../../../../configurations"));
const ProductTypeSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: String,
}, { timestamps: true });
exports.default = (0, mongoose_1.model)(configurations_1.default.DATA_SOURCES.MODEL_NAME_PRODUCT_TYPE, ProductTypeSchema, configurations_1.default.DATA_SOURCES.COLLECTION_NAME_PRODUCT_TYPES);
