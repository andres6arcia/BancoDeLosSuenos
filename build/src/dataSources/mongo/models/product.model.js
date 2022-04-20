"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const configurations_1 = __importDefault(require("../../../../configurations"));
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: String,
    type: { type: mongoose_1.Schema.Types.ObjectId, ref: configurations_1.default.DATA_SOURCES.MODEL_NAME_PRODUCT_TYPE },
    state: { type: String, required: true, default: configurations_1.default.DATA_SOURCES.DEFAULT_VALUE_PRODUCT_STATE_ACCEPTED },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)(configurations_1.default.DATA_SOURCES.MODEL_NAME_PRODUCT, ProductSchema, configurations_1.default.DATA_SOURCES.COLLECTION_NAME_PRODUCTS);
