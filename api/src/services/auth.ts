import { IUser } from '../interfaces/user.interface';
import { IAuth } from '../interfaces/auth.interface';
import UserModel from '../models/User';



const registerNewUser = async (authDataUser: IUser) => {
    const isUserRegistered = await UserModel.findOne({ email: authDataUser.email });
    if (isUserRegistered) {
        return 'USER_ALREADY_EXISTS';
    }

    const hashedPassword = ''
    const registerNewUser = await UserModel.create({
        username: authDataUser.username,
        email: authDataUser.email,
        password: hashedPassword,
    })
    return registerNewUser;
}



export { 
    registerNewUser 
};