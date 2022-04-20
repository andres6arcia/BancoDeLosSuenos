import configurations from "../../../configurations";
import Movement from "../entities/movement.entity";
import User from "../entities/user.entity";
import Product from "../entities/product.entity";
import MovementRepository from "../repositories/movement.repository";
import UserRepository from "../repositories/user.repository";
import ProductRepository from "../repositories/product.repository";


export default class ProductInteractor {

    protected userRepository: UserRepository
    protected productRepository: ProductRepository
    protected movementRepository: MovementRepository

    public constructor(user: UserRepository, product: ProductRepository, movement: MovementRepository) {
        this.userRepository = user
        this.productRepository = product 
        this.movementRepository = movement
    }

    public async createProductMovement(userId: string, productId: string, description: string, value: number, store?: string, tax?: number): Promise<Movement> {

        let user: User | null, product: Product | null, movement: Movement

        // Get user by id
        user = await this.userRepository.getById(userId)
        if (!user) throw new Error(configurations.CORE.MESSAGES.ERROR_USER_NOT_FOUND)

        // Check if productId is valid
        if (!this.productRepository.isValidId(productId)) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND)

        // Get product by id
        product = await this.productRepository.getById(productId)
        if (!product) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND)

        // Check if product is in user's products
        if (!user.products!.find((x:any) => x._id.toString() === productId)) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND_ON_USER)

        // Create a new movement for the user product
        movement = {productId, description, value, store, tax  } as Movement
        movement = await this.movementRepository.create(movement)

        return movement
            
    }

    public async getProductMovementsByDates(userId: string, productId: string, startDate: Date, endDate: Date): Promise<Movement[]> {
            
        let user: User | null, product: Product | null, movements: Movement[]

        // Get user by id
        user = await this.userRepository.getById(userId)
        if (!user) throw new Error(configurations.CORE.MESSAGES.ERROR_USER_NOT_FOUND)

        // Check if productId is valid
        if (!this.productRepository.isValidId(productId)) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND)

        // Get product by id
        product = await this.productRepository.getById(productId)
        if (!product) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND)

        // Check if product is in user's products
        if (!user.products!.find((x:any) => x._id.toString() === productId)) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND_ON_USER)

        // Get movements for the product
        movements = await this.movementRepository.getByDates(productId,startDate,endDate) 

        return movements
            
}

    public async getProductMovements(userId: string, productId: string): Promise<Movement[]> {
            
            let user: User | null, product: Product | null, movements: Movement[]
    
            // Get user by id
            user = await this.userRepository.getById(userId)
            if (!user) throw new Error(configurations.CORE.MESSAGES.ERROR_USER_NOT_FOUND)
    
            // Check if productId is valid
            if (!this.productRepository.isValidId(productId)) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND)
    
            // Get product by id
            product = await this.productRepository.getById(productId)
            if (!product) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND)
    
            // Check if product is in user's products
            if (!user.products!.find((x:any) => x._id.toString() === productId)) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND_ON_USER)
    
            // Get movements for the product
            movements = await this.movementRepository.getAll(productId)
    
            return movements
                
    }

    public async getProductMovement(userId: string, productId: string, movementId: string): Promise<Movement> {
            
        let user: User | null, product: Product | null, movement: Movement | null

        // Get user by id
        user = await this.userRepository.getById(userId)
        if (!user) throw new Error(configurations.CORE.MESSAGES.ERROR_USER_NOT_FOUND)

        // Check if productId is valid
        if (!this.productRepository.isValidId(productId)) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND)

        // Get product by id
        product = await this.productRepository.getById(productId)
        if (!product) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND)

        // Check if product is in user's products
        if (!user.products!.find((x:any) => x._id.toString() === productId)) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_NOT_FOUND_ON_USER)

        // Check if movementId is valid
        if (!this.movementRepository.isValidId(movementId)) throw new Error(configurations.CORE.MESSAGES.ERROR_MOVEMENT_NOT_FOUND)

        // Get movements for the product
        movement = await this.movementRepository.getById(movementId)
        if (!movement) throw new Error(configurations.CORE.MESSAGES.ERROR_MOVEMENT_NOT_FOUND)

        // Check if movement is from user's product
        if (movement.productId.toString() !== productId) throw new Error(configurations.CORE.MESSAGES.ERROR_MOVEMENT_NOT_FOUND_ON_PRODUCT)

        return movement
            
}

}