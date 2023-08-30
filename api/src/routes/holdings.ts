import { Router } from 'express';
const router = Router();

import {
    getAllHoldingsByOwner,
    getHoldingById,
    createHolding,
    updateHoldingById,
    deleteHoldingById,
} from '../controllers/holdings';

// Routes
router.get('/:owner_id', getAllHoldingsByOwner);
router.get('/:id', getHoldingById);
router.post('/', createHolding);
router.put('/:id', updateHoldingById);
router.delete('/:id', deleteHoldingById);

export { router };