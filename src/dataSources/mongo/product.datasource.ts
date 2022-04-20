import configurations from "../../../configurations";
import Product from "../../core/entities/product.entity";
import ProductRepository from "../../core/repositories/product.repository"
import ProductModel from "./models/product.model"
import MongoDB from "./index.datasource";
import mongoose from "mongoose";


export default class ProductMongo implements ProductRepository {

    // If mongoose connection is not open, open it
    protected async checkConnection(): Promise<void>{
        if(mongoose.connection.readyState !== configurations.DATA_SOURCES.DB_MONGO.STATE_CONEECTED) await MongoDB.connect()
    }

    // Check if id is a valid ObjectId
    public isValidId(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id)
    } 

    public async getById(id: string): Promise<(Product | null)>{

        // Check connection is open
        await this.checkConnection()

        // Get product by id and return it
        return await ProductModel.findById(id)

    }

    public async create(product: Product): Promise<Product>{
            
        // Check connection is open
        await this.checkConnection()

        // Create product
        const productModel = new ProductModel(product)
        await productModel.save()

        // Return product
        return productModel
    
    }

    public async update(product: Product): Promise<Product>{
                
        // Check connection is open
        await this.checkConnection()

        // Update Product
        await ProductModel.updateOne({id: product._id}, product)

        // Return Product
        return product
    
    }

}