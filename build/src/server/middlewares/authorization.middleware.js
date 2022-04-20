"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../../configurations"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthorizationMiddleware {
    constructor() {
        this.authorization = async (req, res, next) => {
            const token = req.headers[configurations_1.default.SERVER.JWT.TOKEN_HEADER];
            const { userId } = req.params;
            // Validations
            if (!token) {
                res.status(403).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_NOT_TOKEN_PROVIDED });
                return;
            }
            // Decode token, if it fails, the token is not valid
            try {
                const decoded = await jsonwebtoken_1.default.verify(token, configurations_1.default.SERVER.JWT.SECRET);
                // If the userId is not the same as the one in the token, the token is not valid cause you cant modify someone else's data
                const validations = (userId && decoded && decoded.id && userId !== decoded.id); // Split the if validation in two lines
                if (validations) {
                    res.status(403).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_TOKEN_PROVIDED });
                    return;
                }
            }
            catch (err) {
                res.status(403).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_TOKEN_PROVIDED });
                return;
            }
            // If token is valid, continue
            next();
        };
    }
}
exports.default = new AuthorizationMiddleware().authorization;
