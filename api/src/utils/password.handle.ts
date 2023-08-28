import { hash, compare } from 'bcryptjs'

const SALT_ROUNDS = 10

const encyptPassword = async (password: string) => {
    const hashedPassword = await hash(password, SALT_ROUNDS)
    return hashedPassword
}

const verifyPassword = async (password: string, hashedPassword: string) => {
    const isPasswordCorrect = await compare(password, hashedPassword)
    return isPasswordCorrect
}

export { 
    encyptPassword,
    verifyPassword,
}