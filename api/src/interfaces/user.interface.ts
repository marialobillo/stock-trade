import { IAuth } from './auth.interface';

export interface IUser extends IAuth {
    username: string;
}