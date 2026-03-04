import React, { createContext, useContext, useState } from 'react';

type LoaderContextType = {
    setLoader: (state: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

let setLoaderGlobal: (state: boolean) => void = () => { };

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    setLoaderGlobal = setLoading;

    return (
        <LoaderContext.Provider value={{ setLoader: setLoading }}>
            {children}
            {loading && (
                <div className="fixed inset-0 bg-white/50 flex items-center flex-col justify-center z-2550">
                    <div className="flex gap-2 items-center justify-center">
                        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
                        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                    </div>
                </div>
            )}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) throw new Error('useLoader deve ser usado dentro de LoaderProvider');
    return context;
};

export const setGlobalLoader = (state: boolean) => {
    setLoaderGlobal(state);
};
