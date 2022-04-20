import configurations from "../../../configurations"
import UserRepository from "../repositories/user.repository"
import User from "../entities/user.entity"
import ProductTypeRepository from "../repositories/productType.repository"
import ProductType from "../entities/productType.entity"
import ProductRepository from "../repositories/product.repository"
import Product from "../entities/product.entity"


export default class UserInteractor {

    protected userRepository: UserRepository
    protected productRepository: ProductRepository
    protected productTypeRespository: ProductTypeRepository

    public constructor(user: UserRepository, product: ProductRepository, productType: ProductTypeRepository) {
        this.userRepository = user
        this.productRepository = product 
        this.productTypeRespository = productType
    }

    public async createUserProduct(userId: string, productTypeId: string, name: string): Promise<Product> {

        let user: User | null, productType: ProductType | null

        // Get user by id
        user = await this.userRepository.getById(userId)
        if (!user) throw new Error(configurations.CORE.MESSAGES.ERROR_USER_NOT_FOUND)

        // Get productType by id
        productType = await this.productTypeRespository.getById(productTypeId)
        if (!productType) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_TYPE_NOT_FOUND)

        // Create a new product of the productType for the user
        let product: Product = {name, type:productType._id!.toString() } // toString() because mongoose returns an ObjectId
        product = await this.productRepository.create(product)

        // Add new product to user
        user.products!.push(product._id!.toString()) // toString() because mongoose returns an ObjectId

        // Update user
        user = await this.userRepository.update(user)

        return product 
        
    }

    public async getUserProducts(userId: string): Promise<Product[]> {

        let userPopulated: any

        // Get user by id
        userPopulated = await this.userRepository.getById(userId)
        if (!userPopulated) throw new Error(configurations.CORE.MESSAGES.ERROR_USER_NOT_FOUND)

        // Extract product from user
        let products: Product[] = []
        userPopulated.products!.map((x: any)=> {
            let product:any = {id:x._id, name:x.name, state:x.state, type: x.type.description, createdAt:x.createdAt, updatedAt:x.updatedAt} 
            products.push(product)
        })

        return products 
        
    }

    public async createUserProductRequest(userId: string, productTypeId: string, name:string): Promise<Product> {

        let user: User | null, productType: ProductType | null

        // Get user by id
        user = await this.userRepository.getById(userId)
        if (!user) throw new Error(configurations.CORE.MESSAGES.ERROR_USER_NOT_FOUND)

        // Get productType by id
        productType = await this.productTypeRespository.getById(productTypeId)
        if (!productType) throw new Error(configurations.CORE.MESSAGES.ERROR_PRODUCT_TYPE_NOT_FOUND)

        // Create a new product of the productType for the user
        let product: Product = {name, state:configurations.CORE.VALUES.USER_PRODUCT_STATE_PENDING, type:productType._id!.toString() } // toString() because mongoose returns an ObjectId
        product = await this.productRepository.create(product)

        // Add new product to user
        user.products!.push(product._id!.toString()) // toString() because mongoose returns an ObjectId

        // Update user
        user = await this.userRepository.update(user)

        return product 
        
    }

}