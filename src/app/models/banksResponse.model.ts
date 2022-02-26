export interface Rate {
    code: string;
    sellRate: number;
    buyRate: number;
}

export interface CurrencyRate {
    code: string;
    rates: Rate[];
}

export interface History {
    date: number;
    currencyRate: CurrencyRate[];
}

export interface BanksCurrency {
    code: string;
    name: string;
    history: History[];
}

export interface MainData {
    banksCurrency: BanksCurrency[];
}

export interface ChosenData{
    bankName: string,
    sell: number,
    buy:number
}

export interface BankData{
    bank?: string,
    rate?: number
}

export interface CalculatedData{
    bestBuyRate: BankData,
    bestSellRate:BankData,
    worstBuyRate: BankData,
    worstSellRate: BankData
}

