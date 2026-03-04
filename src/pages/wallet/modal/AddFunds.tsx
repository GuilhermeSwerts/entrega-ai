import { forwardRef, useImperativeHandle, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wallet, X } from "lucide-react";
import { Alert, Question } from "../../../util/alert";
import { maskValue } from "../../../util/mask";
import type { IWallet } from "../../../interface/IWallet";
import { AddFundsWallet } from "../../../services/Wallet/WalletService";

export type AddFundsRef = {
    openModal: () => void;
    closeModal: () => void;
};

type formatCurrencyProps = {
    callBack: (data: IWallet) => void
}

const formatCurrency = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    const number = Number(onlyNumbers) / 100;

    return number.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};

const parseCurrency = (value: string) => {
    return Number(value.replace(/\D/g, "")) / 100;
};

const AddFunds = forwardRef<AddFundsRef, formatCurrencyProps>(({ callBack }, ref) => {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState("");

    useImperativeHandle(ref, () => ({
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false),
    }));

    const handleAdd = async () => {
        const value = parseCurrency(amount);

        if (value < 10) {
            Alert("Depósito mínimo de R$ 10,00", '', false, false, true);
            return;
        }

        if ((await Question(`Deseja realmente adicionar ${maskValue(value)} a seu saldo?`))) {
            AddFundsWallet(value, data => {
                Alert(`Saldo de ${maskValue(value)} adicionado com sucesso!`)
                callBack(data);
                setAmount("");
                setOpen(false);
            });
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Wallet className="h-5 w-5 text-indigo-600" />
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Adicionar saldo
                                </h2>
                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Input */}
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-gray-600">
                                Valor do depósito
                            </label>

                            <input
                                placeholder="R$ 0,00"
                                value={amount}
                                onChange={(e) => setAmount(formatCurrency(e.target.value))}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <small className="text-xs text-gray-400">Depósito mínimo de R$ 10,00</small>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={handleAdd}
                                className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 active:scale-95"
                            >
                                Adicionar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

export default AddFunds;
