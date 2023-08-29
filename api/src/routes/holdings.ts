import { Router } from 'express';
const router = Router();

import {
    getAllHoldings,
    getHoldingById,
    createHolding,
    updateHoldingById,
    deleteHoldingById,
} from '../controllers/holdings';

// Routes
router.get('/', getAllHoldings);
router.get('/:id', getHoldingById);
router.post('/', createHolding);
router.put('/:id', updateHoldingById);
router.delete('/:id', deleteHoldingById);

export { router };