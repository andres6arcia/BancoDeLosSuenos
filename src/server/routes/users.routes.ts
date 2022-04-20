import { Router } from 'express'
import configurations from '../../../configurations'
import UserController from '../controllers/user.controller'
import authorizationMiddleware from '../middlewares/authorization.middleware'


class UserRoutes {
    protected router: Router

    public constructor() {
        this.router = Router()
        this.routes()
    }

    public getRoutes(): Router {
        return this.router
    }
    
    protected routes() {
        this.router.get(  configurations.SERVER.ROUTES.USER_GET_PRODUCTS,          authorizationMiddleware, UserController.getUserProducts)
        this.router.post( configurations.SERVER.ROUTES.USER_POST_PRODUCT,          authorizationMiddleware, UserController.postUserProduct)
        this.router.post(  configurations.SERVER.ROUTES.USER_POST_PRODUCT_REQUEST, authorizationMiddleware, UserController.postUserProductRequest)
    }
}

export default new UserRoutes().getRoutes()