"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../configurations"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const index_routes_1 = __importDefault(require("./server/routes/index.routes"));
const products_routes_1 = __importDefault(require("./server/routes/products.routes"));
const authentication_routes_1 = __importDefault(require("./server/routes/authentication.routes"));
const users_routes_1 = __importDefault(require("./server/routes/users.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.initialize();
    }
    async initialize() {
        await this.configuration();
        await this.routes();
        await this.start();
    }
    async configuration() {
        // Settings
        this.app.set(configurations_1.default.SERVER.SETTINGS.PROPERTY_PORT, configurations_1.default.SERVER.SETTINGS.PORT);
        // Middlewares
        this.app.use((0, morgan_1.default)(configurations_1.default.SERVER.SETTINGS.MORGAN_SETTINGS));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
    }
    async routes() {
        this.app.use(configurations_1.default.SERVER.ROUTES.BASE, index_routes_1.default);
        this.app.use(configurations_1.default.SERVER.ROUTES.BASE, authentication_routes_1.default);
        this.app.use(configurations_1.default.SERVER.ROUTES.BASE, products_routes_1.default);
        this.app.use(configurations_1.default.SERVER.ROUTES.BASE, users_routes_1.default);
    }
    async start() {
        // Start the server
        await this.app.listen(this.app.get(configurations_1.default.SERVER.SETTINGS.PROPERTY_PORT));
        console.log(configurations_1.default.SERVER.MESSAGES.SERVER_ON, this.app.get(configurations_1.default.SERVER.SETTINGS.PROPERTY_PORT));
    }
}
const server = new Server(); // Instance the Server and starts listening
