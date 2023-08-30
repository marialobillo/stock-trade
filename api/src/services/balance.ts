import { IBalance } from '../interfaces/balance.interface';
import BalanceModel from '../models/Balance';

const insertBalance = async (balanceData: IBalance) => {
    const responseInsertBalance = await BalanceModel.create(balanceData);
    return responseInsertBalance;
}

const getBalanceByOwner = async (owner: string) => {
    const responseBalance = await BalanceModel.find({ owner })
    return responseBalance;
}

const getLastBalanceByOwner = async (owner: string) => {
    const responseBalance = await BalanceModel.findOne({ owner }).sort({ createdAt: -1 })
    return responseBalance;
}

const updateBalance = async (owner: string, balanceData: IBalance) => {
    const responseUpdateBalance = await BalanceModel.findOneAndUpdate(
        { owner }, 
        balanceData, 
        { new: true }
    )
    return responseUpdateBalance;
}

const deleteBalance = async (owner: string) => {
    const responseDeleteBalance = await BalanceModel.findOneAndDelete({ owner })
    return responseDeleteBalance;
}


export {
    insertBalance,
    getBalanceByOwner,
    getLastBalanceByOwner,
    updateBalance,
    deleteBalance,
}