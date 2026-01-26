import { ArrowLeftRight, PieChart, Banknote, Wallet, Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

export const BalanceCard = () => {
    const [showBalance, setShowBalance] = useState<boolean>(false);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-10 card-shadow relative overflow-hidden border border-gray-50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />

                <div className="relative z-10">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Wallet /> Saldo Disponível
                        <button onClick={() => setShowBalance(prev => (!prev))} className="text-indigo-600 hover:opacity-[0.7] cursor-pointer">
                            {showBalance && <Eye />}
                            {!showBalance && <EyeClosed />}
                        </button>
                    </span>
                    <div className="flex items-baseline gap-2 mt-4">
                        {showBalance && <span className="text-4xl md:text-5xl font-bold text-slate-900">R$ 4.025,60</span>}
                        {!showBalance && <span className="text-5xl font-bold text-slate-900">R$ ****</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-3 md:mt-6">
                        <button className="text-indigo-600 hover:opacity-[0.7] cursor-pointer">
                            <span className="text-sm text-slate-500"><span className="font-mono flex items-center gap-2">Adicionar Saldo <Banknote /></span></span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 text-xs font-bold card-shadow hover:bg-indigo-700 transition-all">
                        <ArrowLeftRight className="w-4 h-4" />
                        Transações Recentes
                    </button>
                    <button className="bg-white text-slate-400 px-6 py-3 rounded-2xl flex items-center gap-3 text-xs font-bold card-shadow hover:bg-slate-50 transition-all border border-gray-100">
                        <PieChart className="w-4 h-4" />
                        Análise De Gastos
                    </button>
                </div>
            </div>
        </div>
    );
};
