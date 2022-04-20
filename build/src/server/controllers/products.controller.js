"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../../configurations"));
const index_interactor_1 = __importDefault(require("../../core/interactors/index.interactor"));
class ProductsController {
    async postProductMovement(req, res) {
        const { userId, productId } = req.params;
        const { description, value, store, tax } = req.body;
        // Validations
        if (!userId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID, movement: null });
            return;
        }
        if (!productId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PRODUCT_ID, movement: null });
            return;
        }
        if (!value) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_VALUE, movement: null });
            return;
        }
        // Add new product to user and return it 
        try {
            const movement = await index_interactor_1.default.createProductMovement(userId, productId, description, value, store, tax);
            res.status(200).json({ message: configurations_1.default.SERVER.MESSAGES.PRODUCT_MOVEMENT_CREATED, movement });
        }
        catch (err) {
            res.status(400).json({ message: err.message, movement: null });
        }
    }
    async getProductMovementsByDates(req, res) {
        const { userId, productId, startDate, endDate } = req.params;
        const REDUCE_INITIAL_VALUE_FOR_AVERAGE = 0;
        const moment = require('moment');
        // Validations
        if (!userId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID, movements: null });
            return;
        }
        if (!productId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PRODUCT_ID, movements: null });
            return;
        }
        if (!startDate) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_START_DATE, movements: null });
            return;
        }
        if (!endDate) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_END_DATE, movements: null });
            return;
        }
        // Date validations
        if (!moment(startDate, moment.ISO_8601, true).isValid()) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_START_DATE, movements: null });
            return;
        }
        if (!moment(endDate, moment.ISO_8601, true).isValid()) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_END_DATE, movements: null });
            return;
        }
        const startDateTyped = moment(startDate, moment.ISO_8601, true).toDate();
        const endDateTyped = moment(endDate, moment.ISO_8601, true).toDate();
        if (startDateTyped > endDateTyped) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_END_DATE, movements: null });
            return;
        }
        // Add new product to user and return it
        try {
            const movements = await index_interactor_1.default.getProductMovementsByDates(userId, productId, startDateTyped, endDateTyped);
            const average = movements.reduce((accumulated, current) => accumulated + current.value, REDUCE_INITIAL_VALUE_FOR_AVERAGE) / movements.length; // Calculate the average value of the movements returned
            res.status(200).json({ message: configurations_1.default.SERVER.MESSAGES.PRODUCT_MOVEMENTS_RETRIEVED, average, movements });
        }
        catch (err) {
            res.status(400).json({ message: err.message, movements: null });
        }
    }
    async getProductMovements(req, res) {
        const { userId, productId } = req.params;
        // Validations
        if (!userId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID, movements: null });
            return;
        }
        if (!productId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PRODUCT_ID, movements: null });
            return;
        }
        // Add new product to user and return it
        try {
            const movements = await index_interactor_1.default.getProductMovements(userId, productId);
            res.status(200).json({ message: configurations_1.default.SERVER.MESSAGES.PRODUCT_MOVEMENTS_RETRIEVED, movements });
        }
        catch (err) {
            res.status(400).json({ message: err.message, movements: null });
        }
    }
    async getProductMovement(req, res) {
        const { userId, productId, movementId } = req.params;
        // Validations
        if (!userId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID, movement: null });
            return;
        }
        if (!productId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PRODUCT_ID, movement: null });
            return;
        }
        if (!movementId) {
            res.status(400).json({ message: configurations_1.default.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_MOVEMENT_ID, movement: null });
            return;
        }
        // Add new product to user and return it
        try {
            const movement = await index_interactor_1.default.getProductMovement(userId, productId, movementId);
            res.status(200).json({ message: configurations_1.default.SERVER.MESSAGES.PRODUCT_MOVEMENT_RETRIEVED, movement });
        }
        catch (err) {
            res.status(400).json({ message: err.message, movements: null });
        }
    }
}
exports.default = new ProductsController();
