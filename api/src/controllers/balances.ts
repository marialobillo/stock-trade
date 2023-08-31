import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import {
    insertBalance,
    getLastBalanceByOwner,
    deleteBalance,
} from '../services/balance';

const createBalance = async (req: Request, res: Response) => {
    try {
        const responseBalance = await insertBalance(req.body);
        res.send({ responseBalance });
    } catch (error) {
        handleHttp(res, 'ERROR_CREATING_BALANCE')
    }
}


const getLastBalanceByOwnerId = async (req: Request, res: Response) => {
    try {
        const owner_id = req.params.owner_id
        const responseBalance = await getLastBalanceByOwner(owner_id);
        res.send({ responseBalance });
    } catch (error) {
        handleHttp(res, 'ERROR_GETTING_BALANCE_BY_OWNER_ID')
    }
}

const updateBalanceById = async (req: Request, res: Response) => {
    try {
        const owner = req.params.owner_id
        const { amount } = req.body;
        const responseUpdate = await insertBalance({ owner, amount });
        res.send({ responseUpdate });
    } catch (error) {
        handleHttp(res, 'ERROR_UPDATING_BALANCE_BY_OWNER_ID')
    }
}

const deleteBalanceById = async (req: Request, res: Response) => {
    try {
        const owner_id = req.params.owner_id
        const responseDelete = await deleteBalance(owner_id);
        res.send({ responseDelete });
    } catch (error) {
        handleHttp(res, 'ERROR_DELETING_BALANCE_BY_OWNER_ID')
    }
}

export {
    createBalance,
    getLastBalanceByOwnerId,
    updateBalanceById,
    deleteBalanceById,
}