import type { ICustomer } from "../../interface/ICustomer";
import type { ILoginCustomer } from "../../interface/ILogin";
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

export const LoginCustomer = (data: ILoginCustomer, callBack: () => void) => {
    api.post<string>(baseURL + `/login`, data, (msg) => {
        Alert(msg)
        callBack?.();
    })
}

export const LoggoutCustomer = (callBack: () => void) => {
    api.post<string>(baseURL + `/loggout`, {}, (msg) => {
        Alert(msg)
        callBack?.();
    })
}

export const CustomerMe = (callBack?: (userData: ICustomer) => void) => {
    api.get<ICustomer>(baseURL + `/me`, (user) => {
        if (user)
            callBack?.(user);
    }, true)
}