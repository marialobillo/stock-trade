import { Request, Response } from 'express';

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
        console.log('Errors in createBalance: ', error)
    }
}


const getLastBalanceByOwnerId = async (req: Request, res: Response) => {
    try {
        const owner_id = req.params.owner_id
        const responseBalance = await getLastBalanceByOwner(owner_id);
        res.send({ responseBalance });
    } catch (error) {
        console.log('Errors in get the Balances: ', error)
    }
}

const updateBalanceById = async (req: Request, res: Response) => {
    try {
        const owner = req.params.owner_id
        const { amount } = req.body;
        const responseUpdate = await insertBalance({ owner, amount });
        res.send({ responseUpdate });
    } catch (error) {
        console.log('Errors in updateBalanceById: ', error)
    }
}

const deleteBalanceById = async (req: Request, res: Response) => {
    try {
        const owner_id = req.params.owner_id
        const responseDelete = await deleteBalance(owner_id);
        res.send({ responseDelete });
    } catch (error) {
        console.log('Errors in deleteBalanceById: ', error)
    }
}

export {
    createBalance,
    getLastBalanceByOwnerId,
    updateBalanceById,
    deleteBalanceById,
}