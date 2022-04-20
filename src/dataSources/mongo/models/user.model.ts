import { Schema, model } from 'mongoose'
import configurations from '../../../../configurations'

const UserSchema = new Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name:  String,
    products: [{ type: Schema.Types.ObjectId, ref: configurations.DATA_SOURCES.MODEL_NAME_PRODUCT }]
},{timestamps: true})

export default model(configurations.DATA_SOURCES.MODEL_NAME_USER, UserSchema, configurations.DATA_SOURCES.COLLECTION_NAME_USERS)