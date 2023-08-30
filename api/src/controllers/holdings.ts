import { Request, Response } from 'express';
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
        console.log('Errors in getAllHoldings: ', error)
    }
}

const getHoldingById = async (req: Request, res: Response) => {
    try {
        const holdingId = req.params.id;
        const holding = await getHolding(holdingId);
        const data = holding ? holding : 'NOT_HOLDING_FOUND';
        res.send(data);
    } catch (error) {
        console.log('Errors in getHoldingById: ', error)
    }
}

const createHolding = async (req: Request, res: Response) => {
    try {
        const responseHolding = await insertHolding(req.body);
        res.send({ responseHolding });
    } catch (error) {
        console.log('Errors in createHolding: ', error)
    }
}

const updateHoldingById = async (req: Request, res: Response) => {
    try {
        const holdingId = req.params.id;
        const holdingData = req.body;
        const responseUpdate = await updateHolding(holdingId, holdingData);
        res.send({ responseUpdate });
    } catch (error) {
        console.log('Errors in updateHoldingById: ', error)
    }
}

const deleteHoldingById = async (req: Request, res: Response) => {
    try {
        const holdingId = req.params.id;
        const responseDelete = await deleteHolding(holdingId);
        res.send({ responseDelete });
    } catch (error) {
        console.log('Errors in deleteHoldingById: ', error)
    }
}


export {
    getAllHoldingsByOwner,
    getHoldingById,
    createHolding,
    updateHoldingById,
    deleteHoldingById,
}