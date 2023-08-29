import { Schema, model } from 'mongoose';
import { IHolding } from '../interfaces/holding.interface';

const HoldingSchema: Schema = new Schema<IHolding>(
    {
        company: { type: String, required: true },
        symbol: { type: String, required: true, minlength: 3 },
        shares: { type: Number, default: 0 },
        priceBuy: { type: Number, required: true },
        priceSell: { type: Number, required: true },
        dateBuy: { type: Date, default: Date.now },
        dateSell: { type: Date, required: true },
        isActive: { type: Boolean, required: true },
        owner: { type: String, required: true }
    }, 
    {
        timestamps: true, 
        versionKey: false
    } 
)

const HoldingModel = model<IHolding>('Holding', HoldingSchema)

export default HoldingModel;