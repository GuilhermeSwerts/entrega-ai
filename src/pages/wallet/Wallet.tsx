import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { BalanceCard } from '../../components/BalanceCard';
import { TransactionList } from '../../components/TransactionList';
import { CardsWidget } from '../../components/CardsWidget';
import CalendarWithSchedules from '../../components/CalendarWithSchedules';

function Wallet() {
    return (
        <div className="flex min-h-screen bg-[#F5F6FA] font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <Sidebar />

            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <Header />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Content Column */}
                        <div className="lg:col-span-8">
                            <BalanceCard />
                            <TransactionList />
                        </div>

                        {/* Right Sidebar Widgets */}
                        <div className="lg:col-span-4 space-y-8">
                            <CardsWidget />
                            <CalendarWithSchedules />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Wallet;
