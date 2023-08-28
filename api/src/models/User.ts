import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema: Schema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true }, 
        password: { type: String, required: true, minlength: 6, maxlength: 255 }
    }, 
    {
        timestamps: true, 
        versionKey: false
    }
)

const UserModel = model<IUser>('User', UserSchema)

export default UserModel;