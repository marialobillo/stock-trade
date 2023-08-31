import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import {
    insertHolding,
    getHoldings,
    getHolding,
    updateHolding,
    deleteHolding,
} from '../services/holding';

const getAllHoldingsByOwner = async (req: Request, res: Response) => {
    try {
        const owner_id = req.params.owner_id
        const holdings = await getHoldings(owner_id);
        const data = holdings ? holdings : 'NO_HOLDINGS_FOUND';
        res.send(data);
    } catch (error) {
        handleHttp(res, 'ERROR_GETTING_HOLDINGS_BY_OWNER_ID')
    }
}

const getHoldingById = async (req: Request, res: Response) => {
    try {
        const holdingId = req.params.id;
        const holding = await getHolding(holdingId);
        const data = holding ? holding : 'NOT_HOLDING_FOUND';
        res.send(data);
    } catch (error) {
        handleHttp(res, 'ERROR_GETTING_HOLDING_BY_ID')
    }
}

const createHolding = async (req: Request, res: Response) => {
    try {
        const responseHolding = await insertHolding(req.body);
        res.send({ responseHolding });
    } catch (error) {
        handleHttp(res, 'ERROR_CREATING_HOLDING')
    }
}

const updateHoldingById = async (req: Request, res: Response) => {
    try {
        const holdingId = req.params.id;
        const holdingData = req.body;
        const responseUpdate = await updateHolding(holdingId, holdingData);
        res.send({ responseUpdate });
    } catch (error) {
        handleHttp(res, 'ERROR_UPDATING_HOLDING_BY_ID')
    }
}

const deleteHoldingById = async (req: Request, res: Response) => {
    try {
        const holdingId = req.params.id;
        const responseDelete = await deleteHolding(holdingId);
        res.send({ responseDelete });
    } catch (error) {
        handleHttp(res, 'ERROR_DELETING_HOLDING_BY_ID')
    }
}


export {
    getAllHoldingsByOwner,
    getHoldingById,
    createHolding,
    updateHoldingById,
    deleteHoldingById,
}