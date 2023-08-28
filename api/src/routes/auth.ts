import { Router, Request, Response } from 'express';
import { registerController } from '../controllers/auth';

const router = Router();



router.post('/register', registerController)
//router.post('/login', loginController)


export { router };