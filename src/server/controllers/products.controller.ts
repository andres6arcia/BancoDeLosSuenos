import configurations from '../../../configurations';
import { Request, Response } from 'express'
import indexInteractor from '../../core/interactors/index.interactor';



class ProductsController {

    public async postProductMovement(req: Request, res: Response): Promise<void> {
        const { userId, productId } = req.params
        const { description, value, store, tax } = req.body

        // Validations
        if (!userId)    {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID,      movement: null }); return}
        if (!productId) {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PRODUCT_ID,   movement: null }); return}
        if (!value)     {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_VALUE,        movement: null }); return}

        // Add new product to user and return it 
        try{
            const movement = await indexInteractor.createProductMovement(userId, productId, description, value, store, tax)
            res.status(200).json({ message: configurations.SERVER.MESSAGES.PRODUCT_MOVEMENT_CREATED, movement })
        }catch(err:any){ res.status(400).json({ message: err.message, movement: null }) }

    }

    public async getProductMovementsByDates(req: Request, res: Response): Promise<void> {
        const { userId, productId, startDate, endDate } = req.params
        const REDUCE_INITIAL_VALUE_FOR_AVERAGE = 0
        const moment = require('moment')

        // Validations
        if (!userId)    {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID,       movements: null }); return}
        if (!productId) {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PRODUCT_ID,    movements: null }); return}
        if (!startDate) {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_START_DATE,    movements: null }); return}
        if (!endDate)   {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_END_DATE,      movements: null }); return}


        // Date validations
        if (!moment(startDate, moment.ISO_8601, true).isValid()) {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_START_DATE, movements: null }); return}
        if (!moment(endDate,   moment.ISO_8601, true).isValid()) {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_END_DATE,   movements: null }); return}
        const startDateTyped:Date = moment(startDate, moment.ISO_8601, true).toDate()
        const endDateTyped:Date   = moment(endDate,   moment.ISO_8601, true).toDate()
        if (startDateTyped > endDateTyped) {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_END_DATE, movements: null }); return}

        // Add new product to user and return it
        try{
            const movements = await indexInteractor.getProductMovementsByDates(userId, productId, startDateTyped, endDateTyped)
            const average = movements.reduce((accumulated, current) => accumulated + current.value, REDUCE_INITIAL_VALUE_FOR_AVERAGE) / movements.length // Calculate the average value of the movements returned
            res.status(200).json({ message: configurations.SERVER.MESSAGES.PRODUCT_MOVEMENTS_RETRIEVED, average, movements })
        }catch(err:any){ res.status(400).json({ message: err.message, movements: null }) }

        
    }

    public async getProductMovements(req: Request, res: Response): Promise<void> {
        const { userId, productId } = req.params

        // Validations
        if (!userId)    {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID,       movements: null }); return}
        if (!productId) {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PRODUCT_ID,    movements: null }); return}

        // Add new product to user and return it
        try{
            const movements = await indexInteractor.getProductMovements(userId, productId)
            res.status(200).json({ message: configurations.SERVER.MESSAGES.PRODUCT_MOVEMENTS_RETRIEVED, movements })
        }catch(err:any){ res.status(400).json({ message: err.message, movements: null }) }

        
    }

    public async getProductMovement(req: Request, res: Response): Promise<void> {
        const { userId, productId, movementId } = req.params

        // Validations
        if (!userId)    {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_USER_ID,       movement: null }); return}
        if (!productId) {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_PRODUCT_ID,    movement: null }); return}
        if (!movementId) {res.status(400).json({ message: configurations.SERVER.MESSAGES.ERROR_INVALID_PARAMETER_MOVEMENT_ID,  movement: null }); return}

        // Add new product to user and return it
        try{
            const movement = await indexInteractor.getProductMovement(userId, productId, movementId)
            res.status(200).json({ message: configurations.SERVER.MESSAGES.PRODUCT_MOVEMENT_RETRIEVED, movement })
        }catch(err:any){ res.status(400).json({ message: err.message, movements: null }) }

        
    }




}

export default new ProductsController()