import { Schema, model } from 'mongoose'
import configurations from '../../../../configurations'

const MovementSchema = new Schema({
    productId: { required: true, type: Schema.Types.ObjectId, ref: configurations.DATA_SOURCES.MODEL_NAME_PRODUCT },
    value: {type: Number, required: true},
    description: String,
    state: {type: Number, required: true, default: configurations.DATA_SOURCES.DEFAULT_VALUE_MOVEMENT_STATE_ACTIVE},
    store: String,
    tax: Number,
},{timestamps: true})

export default model(configurations.DATA_SOURCES.MODEL_NAME_MOVEMENT, MovementSchema, configurations.DATA_SOURCES.COLLECTION_NAME_MOVEMENTS)

