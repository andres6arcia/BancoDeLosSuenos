
import Product from '../entities/product.entity';


export default interface ProductRepository {
    isValidId(id: string): boolean;
    getById(id: string): Promise<Product | null>
    create(product: Product): Promise<Product>
    update(product: Product): Promise<Product>
}