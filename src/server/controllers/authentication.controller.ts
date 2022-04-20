import configurations from '../../../configurations';
import { Request, Response } from 'express'
import indexInteractor from '../../core/interactors/index.interactor';

class AuthenticationController {
    
    public async signIn(req: Request, res: Response): Promise<void> {
        
        const { id, password } = req.body
        let token:string

        // Validate parameters
        if (!id)        {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_ID,         token: null }); return}
        if (!password)  {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PASSWORD,   token: null }); return} 

        // Get token from interactor
        try{
            token = await indexInteractor.signIn(id, password)
            res.status(200).json({ message: configurations.SERVER.MESSAGES.USER_SIGNED_IN, token })
        }catch(err:any){
            res.status(400).json({ message: err.message, token: null })
        }

    }

    public async createUser(req: Request, res: Response): Promise<void> {

        const { id, password, name } = req.body

        // Validate parameters
        if (!id)        {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_ID,         user: null }); return}
        if (!password)  {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PASSWORD,   user: null }); return} 

        // Create user
        try{
            let user = await indexInteractor.createUser(id, name, password)
            res.status(200).json({ message: configurations.SERVER.MESSAGES.USER_CREATED, user })
        }catch(err:any){
            res.status(400).json({ message: err.message, user: null })
        }

    }

}

export default new AuthenticationController()