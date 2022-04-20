import configurations from "../../../configurations"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"


class AuthorizationMiddleware {

    public authorization = async (req: Request, res: Response, next: NextFunction) => {
        const token = <string>req.headers[configurations.SERVER.JWT.TOKEN_HEADER]
        const {userId} = req.params

        // Validations
        if (!token) {res.status(403).json({ message: configurations.SERVER.MESSAGES.ERROR_NOT_TOKEN_PROVIDED }); return}

        // Decode token, if it fails, the token is not valid
        try{
            
            const decoded:any = await jwt.verify(token, configurations.SERVER.JWT.SECRET) 
            // If the userId is not the same as the one in the token, the token is not valid cause you cant modify someone else's data
            const validations = (userId && decoded && decoded.id && userId !== decoded.id) // Split the if validation in two lines
            if(validations) {res.status(403).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_TOKEN_PROVIDED }); return}

        }catch(err){res.status(403).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_TOKEN_PROVIDED }); return}
        
        // If token is valid, continue
        next()

    }
}

export default new AuthorizationMiddleware().authorization
