import configurations from '../../../configurations';
import { Request, Response } from 'express'
import indexInteractor from '../../core/interactors/index.interactor';


class UserController {

    
    public async getUserProducts(req: Request, res: Response): Promise<void> {

        const { userId } = req.params

        // Validations
        if (!userId) {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID,         products: null }); return}

        // Get products by user and return it 
        try{
            const products = await indexInteractor.getUserProducts(userId)
            res.status(200).json({ message: configurations.SERVER.MESSAGES.USER_PRODUCTS_RETRIEVED, products })
        }catch(err:any){ res.status(400).json({ message: err.message, products: null }) }

    }

    public async postUserProduct(req: Request, res: Response): Promise<void> {

        const { userId, productTypeId } = req.params
        const { name } = req.body

        // Validations
        if (!userId)        {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID,         product: null }); return}
        if (!productTypeId) {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PRODUCT_TYPE_ID, product: null }); return}

        // Add new product to user and return it 
        try{
            const product = await indexInteractor.createUserProduct(userId, productTypeId, name)
            res.status(200).json({ message: configurations.SERVER.MESSAGES.USER_PRODUCT_ADDED, product })
        }catch(err:any){ res.status(400).json({ message: err.message, product: null }) }
        
    }

    public async postUserProductRequest(req: Request, res: Response): Promise<void> {
            
        const { userId, productTypeId } = req.params
        const { name } = req.body

        // Validations
        if (!userId)        {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID,         productRequest: null }); return}
        if (!productTypeId) {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PRODUCT_TYPE_ID, productRequest: null }); return}

        // Add new product to user and return it 
        try{
            const productRequest = await indexInteractor.createUserProductRequest(userId, productTypeId, name)
            res.status(200).json({ message: configurations.SERVER.MESSAGES.USER_PRODUCT_REQUEST_ADDED, productRequest })
        }catch(err:any){ res.status(400).json({ message: err.message, productRequest: null }) }
            
    }

}

export default new UserController()