import { Router } from 'express';
const router = Router();

import {
    createBalance,
    getLastBalanceByOwnerId,
    updateBalanceById,
    deleteBalanceById,
} from '../controllers/balances';

// Routes
router.post('/', createBalance);
router.get('/:owner_id', getLastBalanceByOwnerId);
router.put('/:owner_id', updateBalanceById);
router.delete('/:owner_id', deleteBalanceById);

export { router }