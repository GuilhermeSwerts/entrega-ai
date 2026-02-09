import { BalanceCard } from '../../components/BalanceCard';
import { TransactionList } from '../../components/TransactionList';
import { CardsWidget } from '../../components/CardsWidget';
import CalendarWithSchedules from '../../components/CalendarWithSchedules';

function Wallet() {
    return (
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
    );
}

export default Wallet;
