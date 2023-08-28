import { hash, compare } from 'bcryptjs'

const SALT_ROUNDS = 10

const encyptPassword = async (password: string) => {
    const hashedPassword = await hash(password, SALT_ROUNDS)
    return hashedPassword
}

export { encyptPassword }