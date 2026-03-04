export interface IWallet {
    amount: number
    extracts: IExtractWallet[]
}

export interface IExtractWallet {
    date: string;
    extract: ITabWallet[]
}

export interface ITabWallet {
    idExtractCustomer: string;
    idCustomer: string;
    extractType?: string;
    extractTile?: string;
    extractSubtitle?: string;
    extractAmount: number;
    newBalance: number;
    oldBalance: number;
    dtAction: string;
}
