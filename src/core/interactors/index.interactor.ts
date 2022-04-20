import UserMongo from "../../dataSources/mongo/user.datasource";
import ProductMongo from "../../dataSources/mongo/product.datasource";
import User from "../../core/entities/user.entity";
import AuthenticationInteractor from "./authentication.interactor";
import Product from "../../core/entities/product.entity";
import UserInteractor from "./user.interactor";
import ProductTypeMongo from "../../dataSources/mongo/productType.datasource";
import Movement from "../../core/entities/movement.entity";
import ProductInteractor from "./product.interactor";
import MovementMongo from "../../dataSources/mongo/movement.datasource";


class IndexInteractor {

    // Create dependencies needed by the interactors
    protected userRepository = new UserMongo
    protected productRepository = new ProductMongo
    protected productTypeRepository = new ProductTypeMongo
    protected MovementRepository = new MovementMongo
    

    // Send dependecies to the interactors
    protected authenticationInteractor = new AuthenticationInteractor(this.userRepository)
    protected userInteractor = new UserInteractor(this.userRepository, this.productRepository,this.productTypeRepository)
    protected productInteractor = new ProductInteractor(this.userRepository, this.productRepository, this.MovementRepository)

    public isVAlidId(id: string): boolean {
        return this.productRepository.isValidId(id)
    }

    public async signIn (id: string, password: string): Promise<string> {

        // Get token from interactor and return it
        return await this.authenticationInteractor.signIn(id, password)

    }

    public async createUser (id:string, name:string, password:string): Promise<User> {
    
        // Create user
        return await this.authenticationInteractor.createUser(id, name, password)
    
    }

    

    public async createUserProduct (userId: string, productTypeId: string, name: string): Promise<Product> {

        // Add product to user
        return await this.userInteractor.createUserProduct(userId, productTypeId, name)

    }

    public async getUserProducts (userId: string): Promise<Product[]> {

        // Add product to user
        return await this.userInteractor.getUserProducts(userId)

    }

    public async createUserProductRequest (userId: string, productTypeId: string, name: string): Promise<Product> {

        // Add product to user
        return await this.userInteractor.createUserProductRequest(userId, productTypeId, name)

    }



    public async createProductMovement(userId: string, productId: string, description: string, value: number, store?: string, tax?: number): Promise<Movement> {
            
        // Create movement
        return await this.productInteractor.createProductMovement(userId, productId, description, value, store, tax)

    }

    public async getProductMovements(userId: string, productId: string): Promise<Movement[]> {
            
        // Get product movements
        return await this.productInteractor.getProductMovements(userId, productId)

    }

    public async getProductMovementsByDates(userId: string, productId: string, startDate: Date, endDate: Date): Promise<Movement[]> {
            
        // Get product movements
        return await this.productInteractor.getProductMovementsByDates(userId, productId, startDate, endDate)

    }

    public async getProductMovement(userId: string, productId: string, movementId: string): Promise<Movement> {
            
        // Get product movement by id
        return await this.productInteractor.getProductMovement(userId, productId, movementId)

    }

}

export default new IndexInteractor() 
