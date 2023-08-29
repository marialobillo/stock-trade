import { Router, Request, Response } from 'express';
import { symbolsController } from '../controllers/symbols';

const router = Router();

router.get('/', symbolsController)

export { router };