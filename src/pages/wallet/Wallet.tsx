import { BalanceCard } from '../../components/BalanceCard';
import { TransactionList } from '../../components/TransactionList';
import { CardsWidget } from '../../components/CardsWidget';
import CalendarWithSchedules from '../../components/CalendarWithSchedules';
import { useEffect, useRef, useState } from 'react';
import { GetWallet } from '../../services/Wallet/WalletService';
import type { IWallet } from '../../interface/IWallet';
import AddFunds, { type AddFundsRef } from './modal/AddFunds';

function Wallet() {
    const modalAddFundsRef = useRef<AddFundsRef>(null);

    const [wallet, setWallet] = useState<IWallet>({
        amount: 0,
        extracts: []
    });

    useEffect(() => {
        GetWallet((data) => {
            setWallet(data)
        })
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <AddFunds ref={modalAddFundsRef} callBack={setWallet} />
            {/* Main Content Column */}
            <div className="lg:col-span-8">
                <BalanceCard wallet={wallet} modalAddFundsRef={modalAddFundsRef} />
                <TransactionList wallet={wallet} />
            </div>

            {/* Right Sidebar Widgets */}
            <div className="lg:col-span-4 space-y-8">
                <CardsWidget />
                <CalendarWithSchedules />
            </div>
        </div>
    );
}

export default Wallet;
