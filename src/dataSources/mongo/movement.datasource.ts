import configurations from "../../../configurations"
import mongoose from "mongoose";
import MongoDB from "./index.datasource";
import Movement from "../../core/entities/movement.entity";
import MovementModel from "./models/movement.model";
import MovementRepository from "../../core/repositories/movement.repository";






export default class MovementMongo implements MovementRepository {

    // If mongoose connection is not open, open it
    protected async checkConnection(): Promise<void>{
        if(mongoose.connection.readyState !== configurations.DATA_SOURCES.DB_MONGO.STATE_CONEECTED) await MongoDB.connect()
    }

    // Check if id is a valid ObjectId
    public isValidId(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id)
    }

    public async getByDates(productId:string, startDate: Date, endDate: Date): Promise<Movement[]> {

        // Check connection is open
        await this.checkConnection()

        // Get all movements
        const movements = await MovementModel.find({productId, createdAt: {$gte: startDate, $lte: endDate}})

        return movements

    }

    public async getAll(productId:string): Promise<Movement[]> {

        // Check connection is open
        await this.checkConnection()

        // Get all movements
        const movements = await MovementModel.find({productId})

        return movements

    }

    public async getById(id: string): Promise<(Movement | null)>{

        // Check connection is open
        await this.checkConnection()

        // Get movement by id and return it
        const movement = await MovementModel.findById(id)

        return movement

    }

    public async create(movement: Movement): Promise<Movement>{
            
        // Check connection is open
        await this.checkConnection()

        // Create movement
        const movementModel = new MovementModel(movement)
        await movementModel.save()

        // Return movement
        return movementModel
    
    }

    public async update(movement: Movement): Promise<Movement>{
                
        // Check connection is open
        await this.checkConnection()

        // Update movement
        await MovementModel.updateOne({id: movement._id}, movement)

        // Return movement
        return movement
    
    }

}