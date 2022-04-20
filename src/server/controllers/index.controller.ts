import configurations from '../../../configurations'
import { Request, Response } from 'express'
import pkg from '../../../package.json'

class Controller {

    public index(req: Request, res: Response): void {

        res.json({
            state:configurations.SERVER.MESSAGES.SERVER_STATE_RUNNING,
            author: pkg.author,
            version: pkg.version,
            name: pkg.description
        })
        
    }

}

export const controller = new Controller()