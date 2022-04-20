
import ProductType from '../entities/productType.entity'

export default interface ProductTypeRepository {
    getById(id: string): Promise<ProductType | null>
    create(productType: ProductType): Promise<ProductType>
    update(productType: ProductType): Promise<ProductType>
}