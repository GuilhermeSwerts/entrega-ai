import { Minus, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import type { ITabWallet, IWallet } from '../interface/IWallet';
import { maskValue } from '../util/mask';

export const TransactionList = ({ wallet }: { wallet: IWallet }) => {
    const renderGroup = (title: string, data: ITabWallet[]) => (
        <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 tracking-widest">{title}</h3>
            <div className="space-y-4">
                {data.map((tx) => (
                    <div key={tx.idExtractCustomer} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                tx.extractType === 'debit' ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"
                            )}>
                                {tx.extractType === 'debit' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800">{tx.extractTile}</h4>
                                <p className="text-xs text-slate-400">{tx.extractSubtitle}</p>
                            </div>
                        </div>
                        <span className="text-sm font-bold text-slate-800 tracking-tight">{maskValue(tx.extractAmount)}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-8 mt-12 pb-8 border-t border-gray-100 pt-8">
            {wallet.extracts.map(extract=> (
                renderGroup(extract.date, extract.extract)
            ))}
        </div>
    );
};
