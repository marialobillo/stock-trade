import { Request, Response } from 'express';
import { registerNewUser } from '../services/auth';

const registerController = async (req: Request, res: Response) => {
    const { email, password, username} = req.body;
    const responseUser = await registerNewUser({ email, password, username });
    return res.status(200).json(responseUser);
}

export { 
    registerController 
}