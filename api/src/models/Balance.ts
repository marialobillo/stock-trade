import { Schema, model } from 'mongoose';
import { IBalance } from '../interfaces/balance.interface';

const BalanceSchema: Schema = new Schema<IBalance>(
    {
        owner: { type: String, required: true },
        amount: { type: Number, default: 10000 }
    }, 
    {
        timestamps: true, 
        versionKey: false
    } 
)

const BalanceModel = model<IBalance>('Balance', BalanceSchema)

export default BalanceModel;