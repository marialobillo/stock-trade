export interface IHolding {
    company: string;
    symbol: string;
    shares: number;
    priceBuy: number;
    priceSell: number;
    dateBuy: Date;
    dateSell: Date;
    isActive: boolean;
    owner: string;
}