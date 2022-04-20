import mongoose from 'mongoose'
import configurations from '../../../configurations'


class MongoDb {

    public async connect(): Promise<void> {

        // Connect to MongoDB
        await mongoose.connect(configurations.DATA_SOURCES.DB_MONGO.URL)
        console.log(configurations.DATA_SOURCES.DB_MONGO.MESSAGE_DB_CONNECTED);

    }

    public isValidId(id: string): boolean {
            
        // Check if id is a valid ObjectId
        return mongoose.Types.ObjectId.isValid(id)
    
    }

}

export default new MongoDb()



