import React, { createContext, useContext, useEffect, useState } from "react";
import type { ICustomer } from "../interface/ICustomer";
import { CustomerMe } from "../services/Customer/CustomerService";

interface UserDataContextProps {
    userData: ICustomer | null,
    setUserData: (data: ICustomer) => void
}

// Criando o contexto com valor inicial vazio
const UserDataContext = createContext<UserDataContextProps>({
    userData: null,
    setUserData: () => { },
});

// Provider que vai envolver sua aplicação
export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<ICustomer | null>(null);

    useEffect(() => {
        if (userData == undefined || userData == null)
            CustomerMe(setUserData)
    }, [userData])

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

// Hook para usar facilmente em qualquer componente
export const useUserData = () => useContext(UserDataContext);
