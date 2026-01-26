import { ToggleSwitch } from './inputs/ToggleSwitch';

export const CardsWidget = () => {
    return (
        <div className="bg-white rounded-3xl p-6 card-shadow border border-gray-50 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cartão Adicionado</h3>
                {/* <div className="flex gap-2">
                    <button className="w-6 h-6 rounded-full border border-gray-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                        <ChevronLeft className="w-3 h-3" />
                    </button>
                    <button className="w-6 h-6 rounded-full border border-gray-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                        <ChevronRight className="w-3 h-3" />
                    </button>
                </div> */}
            </div>

            <div className="relative group perspective-1000">
                <div className="w-full aspect-[1.6/1] bg-gradient-to-br from-indigo-600 via-emerald-400 to-indigo-900 rounded-[20px] p-6 text-white flex flex-col justify-between shadow-xl transform transition-transform duration-500 hover:rotate-y-12">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-5 bg-white/20 rounded backdrop-blur-sm" />
                            <span className="text-[8px] font-medium opacity-80 uppercase tracking-widest">Cartão De Crédito</span>
                        </div>
                        <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-red-500/80" />
                            <div className="w-6 h-6 rounded-full bg-amber-500/80" />
                        </div>
                    </div>

                    <div>
                        <div className="flex gap-4 text-base font-medium tracking-[0.2em] mb-4">
                            <span>****</span>
                            <span>****</span>
                            <span>****</span>
                            <span>1121</span>
                        </div>

                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[8px] opacity-60 uppercase mb-1">Nome No Cartão</p>
                                <p className="text-[10px] font-medium uppercase tracking-wider">**** *****</p>
                            </div>
                            <div>
                                <p className="text-[8px] opacity-60 uppercase mb-1">Data Expiração</p>
                                <p className="text-[10px] font-medium tracking-wider">**/**</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-1.5">
                <ToggleSwitch
                    inLine
                    enabled={true}
                    setEnabled={() => { }}
                    label='Saldo Dinâmico'
                    disabled={false}
                />
            </div>
            <div className="flex justify-center gap-1.5">
                <button className='text-gray-400 hover:opacity-[0.7] duration-500 cursor-pointer'>Editar Informações</button>
            </div>

            {/* <div className="flex justify-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            </div> */}
        </div>
    );
};
