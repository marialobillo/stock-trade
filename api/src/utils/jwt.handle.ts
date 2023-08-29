import 'dotenv/config'
import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret.001'

const generateToken = (id: object) => {
    const jwt = sign({ _id: id }, JWT_SECRET, { expiresIn: '2h' })
    return jwt
}

export {
    generateToken,
}