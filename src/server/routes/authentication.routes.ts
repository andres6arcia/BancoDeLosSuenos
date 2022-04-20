import { Router, Request, Response } from 'express'
import configurations from '../../../configurations'
import AuthenticationController from '../controllers/authentication.controller'


class AuthenticationRoutes {
    protected router: Router

    public constructor() {
        this.router = Router()
        this.routes()
    }

    public getRoutes(): Router {
        return this.router
    }

    protected routes() {
        this.router.post(configurations.SERVER.ROUTES.SIGN_IN,     AuthenticationController.signIn)
        this.router.post(configurations.SERVER.ROUTES.CREATE_USER, AuthenticationController.createUser)
    }
}

export default new AuthenticationRoutes().getRoutes()