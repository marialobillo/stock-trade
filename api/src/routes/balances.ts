import { Router } from 'express';
import { checkJwtSession } from '../middlewares/session';
const router = Router();

import {
    createBalance,
    getLastBalanceByOwnerId,
    updateBalanceById,
    deleteBalanceById,
} from '../controllers/balances';

// Routes
router.post('/', checkJwtSession, createBalance);
router.get('/:owner_id', checkJwtSession, getLastBalanceByOwnerId);
router.put('/:owner_id', checkJwtSession, updateBalanceById);
router.delete('/:owner_id', checkJwtSession, deleteBalanceById);

export { router }