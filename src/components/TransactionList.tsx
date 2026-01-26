import { Minus, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

const transactions = [
    {
        id: 1,
        type: 'debit',
        title: 'Delivery 23/01/2026',
        subtitle: 'Cliente Guilherme Swerts',
        amount: 'R$ 12,50',
        date: 'HOJE | 23 JAN, 2026'
    },
    {
        id: 2,
        type: 'credit',
        title: 'Crédito adicionado',
        subtitle: 'PIX',
        amount: 'R$ 2.840,00',
        date: 'HOJE | 23 JAN, 2026'
    }
];

const yesterdayTransactions = [
    {
        id: 1,
        type: 'debit',
        title: 'Delivery 23/01/2026',
        subtitle: 'Cliente Guilherme Swerts',
        amount: 'R$ 12,50',
        date: 'HOJE | 23 JAN, 2026'
    },
    {
        id: 1,
        type: 'debit',
        title: 'Delivery 23/01/2026',
        subtitle: 'Cliente Guilherme Swerts',
        amount: 'R$ 15,50',
        date: 'HOJE | 23 JAN, 2026'
    },
    {
        id: 3,
        type: 'debit',
        title: 'Delivery 23/01/2026',
        subtitle: 'Cliente Guilherme Swerts',
        amount: 'R$ 10,50',
        date: 'HOJE | 23 JAN, 2026'
    },
    {
        id: 4,
        type: 'debit',
        title: 'Delivery 23/01/2026',
        subtitle: 'Cliente Guilherme Swerts',
        amount: 'R$ 9,99',
        date: 'HOJE | 23 JAN, 2026'
    },
];

export const TransactionList = () => {
    const renderGroup = (title: string, data: typeof transactions) => (
        <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 tracking-widest">{title}</h3>
            <div className="space-y-4">
                {data.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                tx.type === 'debit' ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"
                            )}>
                                {tx.type === 'debit' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800">{tx.title}</h4>
                                <p className="text-xs text-slate-400">{tx.subtitle}</p>
                            </div>
                        </div>
                        <span className="text-sm font-bold text-slate-800 tracking-tight">{tx.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-8 mt-12 pb-8 border-t border-gray-100 pt-8">
            {renderGroup('Hoje | 23 JAN, 2026', transactions)}
            {renderGroup('Ontem | 22 JAN, 2026', yesterdayTransactions)}
        </div>
    );
};
