import { IUser } from '../interfaces/user.interface';
import UserModel from '../models/User';
import { encyptPassword } from '../utils/password.handle';



const registerNewUser = async (authDataUser: IUser) => {
    const isUserRegistered = await UserModel.findOne({ email: authDataUser.email });
    if (isUserRegistered) {
        return 'USER_ALREADY_EXISTS';
    }

    const hashedPassword = await encyptPassword(authDataUser.password);
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