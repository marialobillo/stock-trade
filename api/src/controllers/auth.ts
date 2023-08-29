import { Request, Response } from 'express';
import { registerNewUser, loginUser } from '../services/auth';

const registerController = async (req: Request, res: Response) => {
    const { email, password, username} = req.body;
    const responseUser = await registerNewUser({ email, password, username });
    return res.status(200).json(responseUser);
}

const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const responseUser = await loginUser({ email, password })
    if(responseUser === 'USER_NOT_FOUND' || responseUser === 'INCORRECT_PASSWORD') {
        return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json(responseUser);      
}

export { 
    registerController,
    loginController, 
}