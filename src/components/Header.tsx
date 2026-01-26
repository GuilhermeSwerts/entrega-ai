import { Bell, Wallet, User } from 'lucide-react';

export const Header = () => {
    return (
        <header className="flex items-center justify-between mb-8 mt-10 md:mt-0">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">Carteira <Wallet /></h1>
                <p className="text-slate-400 text-sm mt-1">Oi Guilherme, Aqui você vai olhar tudo referente a sua carteira!</p>
            </div>

            <div className="flex items-center gap-4">
                <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors border border-gray-100 card-shadow relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
            </div>
        </header>
    );
};
