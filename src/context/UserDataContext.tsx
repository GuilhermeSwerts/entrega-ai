import React, { createContext, useContext, useEffect, useState } from "react"
import type { ICustomer } from "../interface/ICustomer"
import { CustomerMe } from "../services/Customer/CustomerService"
import { registerUserDataSetter } from "../globalHook/userDataGlobal"

interface UserDataContextProps {
    userData: ICustomer | null
    setUserData: (data: ICustomer | null) => void
    clearUserData: () => void
}

const UserDataContext = createContext<UserDataContextProps>({
    userData: null,
    setUserData: () => { },
    clearUserData: () => { },
})

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<ICustomer | null>(null)

    const clearUserData = () => {
        setUserData(null)
    }

    // 🔥 registra o setter global UMA vez
    useEffect(() => {
        registerUserDataSetter(setUserData)
    }, [])

    useEffect(() => {
        if (!userData) {
            CustomerMe(setUserData)
        }
    }, [userData])

    return (
        <UserDataContext.Provider
            value={{
                userData,
                setUserData,
                clearUserData,
            }}
        >
            {children}
        </UserDataContext.Provider>
    )
}

export const useUserData = () => useContext(UserDataContext)
