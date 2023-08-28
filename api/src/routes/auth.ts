import { Router, Request, Response } from 'express';

const router = Router();



router.post('/register', registerController)
//router.post('/login', loginController)


export { router };