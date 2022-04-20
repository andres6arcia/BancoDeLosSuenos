import configurations from "../../../configurations"
import UserRepository from "../repositories/user.repository"
import User from "../entities/user.entity"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export default class AuthenticationInteractor {

    protected userRepository: UserRepository

    public constructor(user: UserRepository){
        this.userRepository = user
    }

    public async signIn (id: string, password: string): Promise<string> {
    
        // Get user by id
        const user = await this.userRepository.getById(id)
        if (!user) throw new Error(configurations.CORE.MESSAGES.ERROR_USER_OR_PASSWORD_INCORRECT)
    
        // Compare passwords
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new Error(configurations.CORE.MESSAGES.ERROR_USER_OR_PASSWORD_INCORRECT)
    
        // Get authentication token
        let token = await jwt.sign({ id: user.id }, configurations.CORE.JWT.SECRET , { expiresIn: configurations.CORE.JWT.EXPIRES })
    
        return token;
    }

    public async createUser (id:string, name:string, password:string): Promise<User> {
            
        // Check if user exists
        let userFound = await this.userRepository.getById(id)
        if (userFound) throw new Error(configurations.CORE.MESSAGES.ERROR_USER_ALREADY_EXISTS)

        // Encrypt password
        let salt = await bcrypt.genSalt(configurations.CORE.JWT.SALT) 
        password = await bcrypt.hash(password, salt)
    
        // Create user
        let user: User = {id, name, password}
        return await this.userRepository.create(user)
    
    }

}