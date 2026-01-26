import { useState } from "react";
import {
    BarChart3,
    HelpCircle,
    Wallet,
    PackagePlus,
    PackageCheck,
    UserCog,
    Menu,
    X
} from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
    { icon: Wallet, label: "Carteira", active: true },
    { icon: BarChart3, label: "Análise", active: false },
    { icon: PackagePlus, label: "Solicitar Entrega", active: false },
    { icon: PackageCheck, label: "Minhas Entregas", active: false },
    { icon: UserCog, label: "Meu Perfil", active: false },
    { icon: HelpCircle, label: "Ajuda", active: false }
];

export const Sidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* HEADER MOBILE */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full opacity-50" />
                    </div>
                    <span className="font-bold text-lg">Entregaí</span>
                </div>

                <button onClick={() => setOpen(true)}>
                    <Menu className="w-6 h-6 text-slate-600" />
                </button>
            </header>

            {/* OVERLAY MOBILE */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={cn(
                    "fixed md:static top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-100 p-6 flex flex-col transition-transform duration-300",
                    open ? "translate-x-0" : "-translate-x-full",
                    "md:translate-x-0"
                )}
            >
                {/* HEADER SIDEBAR MOBILE */}
                <div className="flex items-center justify-between mb-10 md:hidden">
                    <span className="text-xl font-bold">Entregaí</span>
                    <button onClick={() => setOpen(false)}>
                        <X className="w-6 h-6 text-slate-600" />
                    </button>
                </div>

                {/* LOGO DESKTOP */}
                <div className="hidden md:flex items-center gap-2 mb-12 px-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full opacity-50" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">Entregaí</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            className={cn(
                                "w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                                item.active
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                            )}
                            onClick={() => setOpen(false)}
                        >
                            <item.icon
                                className={cn(
                                    "w-5 h-5",
                                    item.active
                                        ? "text-indigo-600"
                                        : "text-slate-400 group-hover:text-slate-600"
                                )}
                            />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    );
};
