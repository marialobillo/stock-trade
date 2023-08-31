import { Router } from 'express';
import { checkJwtSession } from '../middlewares/session';
const router = Router();

import {
    getAllHoldingsByOwner,
    getHoldingById,
    createHolding,
    updateHoldingById,
    deleteHoldingById,
} from '../controllers/holdings';

// Routes
router.get('/:owner_id', checkJwtSession, getAllHoldingsByOwner);
router.get('/:id', checkJwtSession, getHoldingById);
router.post('/', checkJwtSession, createHolding);
router.put('/:id', checkJwtSession, updateHoldingById);
router.delete('/:id', checkJwtSession, deleteHoldingById);

export { router };