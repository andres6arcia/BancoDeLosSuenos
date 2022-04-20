"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const configurations_1 = __importDefault(require("../../configurations"));
const package_json_1 = __importDefault(require("../../package.json"));
class Controller {
    index(req, res) {
        res.json({
            state: configurations_1.default.SERVER.MESSAGES.SERVER_STATE_RUNNING,
            author: package_json_1.default.author,
            version: package_json_1.default.version,
            name: package_json_1.default.description,
            routes: [
                { route: '/signIn', description: 'Gives a token to access the API' },
            ]
        });
    }
}
exports.controller = new Controller();
