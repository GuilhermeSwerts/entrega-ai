import type { IWallet } from "../../interface/IWallet";
import { api } from "../api";

const baseURL = 'Wallet'

export const GetWallet = (callBack: (data: IWallet) => void) => {
    api.get<IWallet>(baseURL + "/Customer", callBack)
}

export const AddFundsWallet = (amount: number, callBack: (data: IWallet) => void) => {
    api.post<IWallet>(baseURL + "/add-funds", { amount }, callBack)
}