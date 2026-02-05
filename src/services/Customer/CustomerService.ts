import type { ICustomerRegister } from "../../interface/Register";
import { Alert } from "../../util/alert";
import { api } from "../api";

const baseURL = 'Customer'

export const RegisterCustomer = (data: ICustomerRegister, callBack: (id_customer: string) => void) => {
    api.post<string>(baseURL + "/register", data, callBack)
}

export const ResentValidationCode = (id_customer: string, callBack?: () => void) => {
    api.get<string>(baseURL + `/${id_customer}/resent-validation-code`, (msg) => {
        Alert(msg)
        callBack?.();
    })
}

export const ValidationCodeEmail = (id_customer: string, code: string, callBack?: () => void) => {
    api.get<string>(baseURL + `/${id_customer}/validation-code?code=${code}`, (msg) => {
        Alert(msg)
        callBack?.();
    })
}