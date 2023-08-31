import 'dotenv/config'
import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret.001'

const generateToken = (id: object) => {
    const jwt = sign({ _id: id }, JWT_SECRET, { expiresIn: '2h' })
    return jwt;
}

const verifyToken = async (token: string) => {
    const isValidJwt = await verify(token, JWT_SECRET)
    return isValidJwt;
}

export {
    generateToken,
    verifyToken,
}

