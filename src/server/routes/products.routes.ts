import { Router } from 'express'
import configurations from '../../../configurations'
import ProductsController from '../controllers/products.controller'
import authorizationMiddleware from '../middlewares/authorization.middleware'


class ProductsRoutes {
    protected router: Router

    public constructor() {
        this.router = Router()
        this.routes()
    }

    public getRoutes(): Router {
        return this.router
    }
    
    protected routes() {
        this.router.get(    configurations.SERVER.ROUTES.PRODUCT_GET_MOVEMENTS,          authorizationMiddleware, ProductsController.getProductMovements)
        this.router.post(   configurations.SERVER.ROUTES.PRODUCT_POST_MOVEMENT,          authorizationMiddleware, ProductsController.postProductMovement)
        this.router.get(    configurations.SERVER.ROUTES.PRODUCT_GET_MOVEMENT,           authorizationMiddleware, ProductsController.getProductMovement)
        this.router.get(    configurations.SERVER.ROUTES.PRODUCT_GET_MOVEMENTS_BY_DATES, authorizationMiddleware, ProductsController.getProductMovementsByDates)
    }
}

export default new ProductsRoutes().getRoutes()