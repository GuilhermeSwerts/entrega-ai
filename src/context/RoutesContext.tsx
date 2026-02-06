import React, { createContext, useContext, useState } from "react";
import type { IRoutes } from "../interface/IRoutes";
interface RoutesContextProps {
    routesMap: IRoutes[];
    setRoutesMap: (routes: IRoutes[]) => void;
}

// Criando o contexto com valor inicial vazio
const RoutesContext = createContext<RoutesContextProps>({
    routesMap: [],
    setRoutesMap: () => { },
});

// Provider que vai envolver sua aplicação
export const RoutesProvider = ({ children }: { children: React.ReactNode }) => {
    const [routesMap, setRoutesMap] = useState<IRoutes[]>([]);

    return (
        <RoutesContext.Provider value={{ routesMap, setRoutesMap }}>
            {children}
        </RoutesContext.Provider>
    );
};

// Hook para usar facilmente em qualquer componente
export const useRoutes = () => useContext(RoutesContext);
