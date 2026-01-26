import React, { useState } from 'react';
import { cn } from '../lib/utils';

export const QuickTransfer = () => {
    const [method, setMethod] = useState<'mobile' | 'account'>('mobile');

    return (
        <div className="bg-white rounded-3xl p-6 card-shadow border border-gray-50 h-[300px] flex flex-col">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Quick Transfer</h3>

            <div className="flex gap-2 p-1 bg-slate-50 rounded-xl mb-6">
                <button
                    onClick={() => setMethod('mobile')}
                    className={cn(
                        "flex-1 py-2 text-[10px] font-bold rounded-lg transition-all",
                        method === 'mobile' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"
                    )}
                >
                    VIA MOBILE NO.
                </button>
                <button
                    onClick={() => setMethod('account')}
                    className={cn(
                        "flex-1 py-2 text-[10px] font-bold rounded-lg transition-all",
                        method === 'account' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"
                    )}
                >
                    VIA ACCOUNT NO.
                </button>
            </div>

            <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">🇮🇳</span>
                        <span className="text-xs font-bold text-slate-600 text-nowrap">+91</span>
                    </div>
                    <input
                        type="text"
                        placeholder="92934929331"
                        className="w-full text-xs font-bold text-slate-800 outline-none"
                    />
                    <img src="https://ui-avatars.com/api/?name=John+Doe&background=indigo&color=fff" className="w-6 h-6 rounded-lg ml-auto" alt="Recipient" />
                </div>

                <div className="flex items-center justify-between p-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-300">₹</span>
                        <input type="text" placeholder="30,550.00" className="bg-transparent outline-none font-bold text-slate-800 text-sm w-32" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">INR</span>
                </div>
            </div>

            <button className="w-full py-4 bg-emerald-400 text-white rounded-2xl text-[10px] font-bold tracking-widest hover:bg-emerald-500 transition-colors mt-auto">
                SEND TO JOHN
            </button>
        </div>
    );
};
