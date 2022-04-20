import configurations from '../configurations';
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import indexRoutes from './server/routes/index.routes'
import productsRoutes from './server/routes/products.routes'
import authenticationRoutes from './server/routes/authentication.routes'
import usersRoutes from './server/routes/users.routes'



class Server {
    protected app: express.Application

    public constructor(){
        this.app = express()
        this.initialize()
    }

    protected async initialize(){
        await this.configuration()
        await this.routes()
        await this.start()
    }

    protected async configuration(){

        // Settings
        this.app.set(configurations.SERVER.SETTINGS.PROPERTY_PORT, configurations.SERVER.SETTINGS.PORT)

        // Middlewares
        this.app.use(morgan(configurations.SERVER.SETTINGS.MORGAN_SETTINGS))
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(compression())

    }

    protected async routes(){

        this.app.use(configurations.SERVER.ROUTES.BASE,indexRoutes)
        this.app.use(configurations.SERVER.ROUTES.BASE,authenticationRoutes)
        this.app.use(configurations.SERVER.ROUTES.BASE,productsRoutes)
        this.app.use(configurations.SERVER.ROUTES.BASE,usersRoutes)

    }

    protected async start(){
        // Start the server
        await this.app.listen(this.app.get(configurations.SERVER.SETTINGS.PROPERTY_PORT))
        console.log(configurations.SERVER.MESSAGES.SERVER_ON, this.app.get(configurations.SERVER.SETTINGS.PROPERTY_PORT))

    }
    

}

const server = new Server() // Instance the Server and starts listening