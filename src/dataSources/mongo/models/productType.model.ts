import { Schema, model } from 'mongoose'
import configurations from '../../../../configurations'

const ProductTypeSchema = new Schema({
    id: {type: String, required: true, unique: true},
    name:  {type: String, required: true},
    description: String,
},{timestamps: true})

export default model(configurations.DATA_SOURCES.MODEL_NAME_PRODUCT_TYPE, ProductTypeSchema, configurations.DATA_SOURCES.COLLECTION_NAME_PRODUCT_TYPES)