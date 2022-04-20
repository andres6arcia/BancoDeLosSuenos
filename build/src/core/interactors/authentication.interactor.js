"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../../configurations"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthenticationInteractor {
    constructor(user) {
        this.userRepository = user;
    }
    async signIn(id, password) {
        // Get user by id
        const user = await this.userRepository.getById(id);
        if (!user)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_USER_OR_PASSWORD_INCORRECT);
        // Compare passwords
        let isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_USER_OR_PASSWORD_INCORRECT);
        // Get authentication token
        let token = await jsonwebtoken_1.default.sign({ id: user.id }, configurations_1.default.CORE.JWT.SECRET, { expiresIn: configurations_1.default.CORE.JWT.EXPIRES });
        return token;
    }
    async createUser(id, name, password) {
        // Check if user exists
        let userFound = await this.userRepository.getById(id);
        if (userFound)
            throw new Error(configurations_1.default.CORE.MESSAGES.ERROR_USER_ALREADY_EXISTS);
        // Encrypt password
        let salt = await bcrypt_1.default.genSalt(configurations_1.default.CORE.JWT.SALT);
        password = await bcrypt_1.default.hash(password, salt);
        // Create user
        let user = { id, name, password };
        return await this.userRepository.create(user);
    }
}
exports.default = AuthenticationInteractor;
