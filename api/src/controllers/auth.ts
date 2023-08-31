import { Request, Response } from 'express';
import { registerNewUser, loginUser } from '../services/auth';
import { handleHttp } from '../utils/error.handle';

const registerController = async (req: Request, res: Response) => {
    try {
        const { email, password, username} = req.body;
        const responseUser = await registerNewUser({ email, password, username });
        return res.status(200).json(responseUser); 
    } catch (error) {
        handleHttp(res, 'ERROR_REGISTERING_USER')
    }
}

const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const responseUser = await loginUser({ email, password })
        if(responseUser === 'USER_NOT_FOUND' || responseUser === 'INCORRECT_PASSWORD') {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json(responseUser);
    } catch (error) {
        handleHttp(res, 'ERROR_LOGING_USER')
    }     
}

export { 
    registerController,
    loginController, 
}