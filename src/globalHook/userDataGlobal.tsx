import type { ICustomer } from "../interface/ICustomer"

let setUserDataGlobal: ((data: ICustomer | null) => void) | null = null

export const registerUserDataSetter = (
    setter: (data: ICustomer | null) => void
) => {
    setUserDataGlobal = setter
}

export const clearUserDataGlobal = () => {
    if (setUserDataGlobal) {
        setUserDataGlobal(null)
    }
}
