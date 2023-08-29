import { IUser } from '../interfaces/user.interface';
import { IAuth } from '../interfaces/auth.interface';
import UserModel from '../models/User';
import { encyptPassword } from '../utils/password.handle';
import { hash, compare } from 'bcryptjs';
import { generateToken } from '../utils/jwt.handle';



const registerNewUser = async (authDataUser: IUser) => {
    const isUserRegistered = await UserModel.findOne({ email: authDataUser.email });
    if (isUserRegistered) return 'USER_ALREADY_EXISTS';
    const hashedPassword = await encyptPassword(authDataUser.password);

    const registerNewUser = await UserModel.create({
        username: authDataUser.username,
        email: authDataUser.email,
        password: hashedPassword,
    })
    return registerNewUser;
}

const loginUser = async ({ email, password }: IAuth) => {
    const isUserRegistered = await UserModel.findOne({ email });
    if (!isUserRegistered) return 'USER_NOT_FOUND';

    const hashedPassword = isUserRegistered.password;
    const isPasswordCorrect = await compare(password, hashedPassword);
    if (!isPasswordCorrect) return 'INCORRECT_PASSWORD';
    const token = generateToken(isUserRegistered._id);
    const loginData = {
        user: isUserRegistered,
        token,
    }
    return isPasswordCorrect ? loginData : 'INCORRECT_PASSWORD';
}



export { 
    registerNewUser 
};