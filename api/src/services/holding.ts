import { IHolding } from "../interfaces/holding.interface";
import HoldingModel from "../models/Holding";

const insertHolding = async (holdingData: IHolding) => {
    const holding = await HoldingModel.create(holdingData);
    return holding;
}

const getHoldings = async (owner: string) => {
    const responseHoldings = await HoldingModel.find({ owner });
    return responseHoldings;
}

const getHolding = async (holdingId: string) => {
    const holding = await HoldingModel.findById(holdingId);
    return holding;
}

const updateHolding = async (holdingId: string, holdingData: IHolding) => {
    const responseUpdate = await HoldingModel.findByIdAndUpdate(
        { _id: holdingId }, 
        holdingData, 
        { new: true });
    return responseUpdate;
}

const deleteHolding = async (holdingId: string) => {
    const responseDelete = await HoldingModel.findByIdAndDelete(holdingId);
    return responseDelete;
}

export {
    insertHolding,
    getHoldings,
    getHolding,
    updateHolding,
    deleteHolding,
}