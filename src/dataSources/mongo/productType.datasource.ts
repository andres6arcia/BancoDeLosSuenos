import configurations from "../../../configurations";
import MongoDB from "./index.datasource";
import mongoose from "mongoose";
import ProductTypeRepository from "../../core/repositories/productType.repository";
import ProductType from "../../core/entities/productType.entity";
import ProductTypeModel from "./models/productType.model"



export default class ProductTypeMongo implements ProductTypeRepository {

    // If mongoose connection is not open, open it
    protected async checkConnection(): Promise<void>{
        if(mongoose.connection.readyState !== configurations.DATA_SOURCES.DB_MONGO.STATE_CONEECTED) await MongoDB.connect()
    }

    public async getById(id: string): Promise<(ProductType | null)>{

        // Check connection is open
        await this.checkConnection()

        // Get the productType by id and return it
        return await ProductTypeModel.findOne({id})

    }
    
    public async create(productType: ProductType): Promise<ProductType>{
            
        // Check connection is open
        await this.checkConnection()

        // Create productType
        const productTypeModel = new ProductTypeModel(productType)
        await productTypeModel.save()

        // Return productType
        return productTypeModel
    
    }

    public async update(productType: ProductType): Promise<ProductType>{
                
        // Check connection is open
        await this.checkConnection()

        // Update productType
        await ProductTypeModel.updateOne({id: productType.id}, productType)

        // Return productType
        return productType
    
    }



}