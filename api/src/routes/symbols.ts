import { Router } from 'express';
import { symbolsController } from '../controllers/symbols';

const router = Router();

router.get('/', symbolsController)

export { router };