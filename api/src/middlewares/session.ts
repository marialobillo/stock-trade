import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.handle';
import { JwtPayload } from 'jsonwebtoken';

interface RequestWithJwt extends Request {
    user?: string | JwtPayload;
}

const checkJwtSession = async (req: RequestWithJwt, res: Response, next: NextFunction) => {
    try {
       
        const jwtByUser = req.headers.authorization || '';
        const jwt = jwtByUser.split(' ').pop()
        const isValidToken= await verifyToken(`${jwt}`)
        
        if(!isValidToken) {
            return res.status(401).send('NON_VALID_JWT_TOKEN')
        }
        else {
            req.user = isValidToken as {email: string};
        }
        next()
    } catch (error) {
        res.status(400).send('ERROR_CHECK_JWT_SESSION')   
    }
}

export {
    checkJwtSession
}