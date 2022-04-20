import configurations from "../../../configurations";
import User from "../../core/entities/user.entity";
import UserRepository from "../../core/repositories/user.repository"
import UserModel from "./models/user.model"
import MongoDB from "./index.datasource";
import mongoose from "mongoose";


export default class UserMongo implements UserRepository {

    // If mongoose connection is not open, open it
    protected async checkConnection(): Promise<void>{
        if(mongoose.connection.readyState !== configurations.DATA_SOURCES.DB_MONGO.STATE_CONEECTED) await MongoDB.connect()
    }

    public async getById(id: string): Promise<(User | null)>{

        // Check connection is open
        await this.checkConnection()

        // Get user by id and return it
        const populateOptions = {
            path: configurations.DATA_SOURCES.COLLECTION_NAME_PRODUCTS,
            populate:{
                path: configurations.DATA_SOURCES.POPULATE_FIELD_PRODUCT_TYPE,
                model: configurations.DATA_SOURCES.MODEL_NAME_PRODUCT_TYPE,
                select: configurations.DATA_SOURCES.POPULATE_FIELD_PRODUCT_TYPE_SELECT
            },
        }
        const user = await UserModel.findOne({id}).populate(populateOptions)

        return user

    }

    public async create(user: User): Promise<User>{
            
        // Check connection is open
        await this.checkConnection()

        // Create user
        const userModel = new UserModel(user)
        await userModel.save()

        // Return user
        return userModel
    
    }

    public async update(user: User): Promise<User>{
                
        // Check connection is open
        await this.checkConnection()

        // Update user
        await UserModel.updateOne({id: user.id}, user)

        // Return user
        return user
    
    }

}