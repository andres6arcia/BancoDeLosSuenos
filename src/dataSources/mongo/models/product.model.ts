import { Schema, model } from 'mongoose'
import configurations from '../../../../configurations'

const ProductSchema = new Schema({
    name:  {type: String, required: true},
    description: String,
    type:  { type: Schema.Types.ObjectId, ref: configurations.DATA_SOURCES.MODEL_NAME_PRODUCT_TYPE},
    state: {type: String, required: true, default: configurations.DATA_SOURCES.DEFAULT_VALUE_PRODUCT_STATE_ACCEPTED},
},{timestamps: true})

export default model(configurations.DATA_SOURCES.MODEL_NAME_PRODUCT, ProductSchema, configurations.DATA_SOURCES.COLLECTION_NAME_PRODUCTS)