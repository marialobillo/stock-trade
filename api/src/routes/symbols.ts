import { Router } from 'express';
import { symbolsController } from '../controllers/symbols';
import { checkJwtSession } from '../middlewares/session';

const router = Router();

router.get('/', checkJwtSession, symbolsController)

export { router };