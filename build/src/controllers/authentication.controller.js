"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../configurations"));
const index_interactor_1 = __importDefault(require("../core/interactors/index.interactor"));
class AuthenticationController {
    async signIn(req, res) {
        const { id, password } = req.body;
        let token;
        // Validate parameters
        if (!id) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_ID_PARAMETER, token: null });
            return;
        }
        if (!password) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PASSWORD_PARAMETER, token: null });
            return;
        }
        // Get token from interactor
        try {
            token = await index_interactor_1.default.signIn(id, password);
            res.status(200).json({ message: configurations_1.default.SERVER.MESSAGES.USER_SIGNED_IN, token });
        }
        catch (err) {
            res.status(400).json({ message: err.message, token: null });
        }
    }
    async createUser(req, res) {
        const { id, password, name } = req.body;
        // Validate parameters
        if (!id) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_ID_PARAMETER, user: null });
            return;
        }
        if (!password) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PASSWORD_PARAMETER, user: null });
            return;
        }
        // Create user
        let user = { id, password, name };
        try {
            user = await index_interactor_1.default.createUser(user);
            res.status(200).json({ message: configurations_1.default.SERVER.MESSAGES.USER_CREATED, user });
        }
        catch (err) {
            res.status(400).json({ message: err.message, user: null });
        }
    }
}
exports.default = new AuthenticationController();
