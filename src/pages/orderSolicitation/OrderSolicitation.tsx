import Button from '../../components/inputs/Button';
import {
    Home,
    Utensils,
    Bike,
} from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import { useOrderSolicitation } from './hook/useOrderSolicitation';
import OrderSolicitationModal from './modal/OrderSolicitationModal';
import { MapComponent } from './components/MapComponent';
import { formatDuration } from '../../util/mask';

const OrderSolicitation = () => {
    const { modalNewSolicitationRef, setDeliveryMotoboys, orders, orderSelected, setOrderSelected, userData } = useOrderSolicitation()

    const createCustomIcon = (icon: React.ReactNode, color: string, bgColor: string = "white") => {
        return <div style={{ color, backgroundColor: bgColor }} className="p-1.5 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
            {icon}
        </div>;
    };

    return (
        <>
            <OrderSolicitationModal setDeliveryMotoboys={setDeliveryMotoboys} modalRef={modalNewSolicitationRef} />
            <div className="flex items-center justify-center md:justify-end">
                <Button onClick={() => modalNewSolicitationRef.current?.onOpenNew()} className='flex items-center justify-center gap-2'>
                    <FaPlus /> Fazer nova solicitação
                </Button>
            </div>

            {/* Map and Sidebar Section */}
            <span className='text-gray-400'>Legendas:</span>
            <div className="w-full flex items-center justify-center">
                <div className="grid grid-cols-3">
                    <div className='flex flex-col items-center justify-center'>
                        {createCustomIcon(<Utensils size={20} />, "#ffffff", "#10b981")}
                        <span className='text-gray-400'>Restaurante</span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        {createCustomIcon(<Bike size={20} />, "#ffffff", "#10b981")}
                        <span className='text-gray-400'>Motoboys Responsável Pela Entrega</span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        {createCustomIcon(<Home size={20} />, "#ffffff", "#f97316")}
                        <span className='text-gray-400'>Endereço De Entrega</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 h-[500px]">
                <div className='w-[25%] h-[500px] overflow-auto bg-white h-full p-5 rounded-3xl'>
                    <span className='text-gray-400'>Pedidos Em Andamento:</span>
                    {orders.map((order) => {
                        const isSelected = orderSelected?.numOrder === order.numOrder;

                        const customerName = order.customerName
                            ? order.customerName.split(" ")[0].toUpperCase()
                            : "-";

                        const motoboyName = order.motoboyName
                            ? order.motoboyName.split(" ")[0].toUpperCase()
                            : "Buscando...";

                        const distance = order.motoboyDistance || "-";
                        const time = order.motoboyTime
                            ? formatDuration(order.motoboyTime)
                            : "-";

                        return (
                            <div
                                key={order.numOrder}
                                onClick={() => setOrderSelected(order)}
                                className={`
                                w-full 
                                p-3 
                                border 
                                rounded-lg 
                                cursor-pointer 
                                transition-all 
                                duration-300
                                shadow-sm
                                ${isSelected
                                    ? "border-blue-500 bg-blue-50 shadow-md"
                                    : "border-gray-300 hover:border-blue-400 hover:shadow-md"}
                            `}
                            >
                                <div className="space-y-1 text-sm">
                                    <p><strong>Pedido:</strong> #{order.numOrder}</p>
                                    <p><strong>Cliente:</strong> {customerName}</p>
                                    <p><strong>Motoboy:</strong> {motoboyName}</p>
                                    <p><strong>Distância:</strong> {distance}</p>
                                    <p><strong>Tempo estimado:</strong> {time}</p>
                                    <p><strong>Status:</strong> {
                                        order.orderAcceptForMotoboy 
                                            ? "Corrida aceita" 
                                            : motoboyName == "" 
                                                ? "-" 
                                                : "Aguardando motoboy"
                                    }</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="w-[75%] lg:col-span-9 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                    <MapComponent
                        motoboys={!orderSelected ? [] : [
                            { id: '1', position: [orderSelected.motoboyLat, orderSelected.motoboyLon], name: orderSelected.motoboyName, status: 'busy' }
                        ]}
                        orderLocation={!orderSelected ? undefined : [orderSelected.customerLat, orderSelected.customerLon]}
                        restaurantLocation={[userData?.lat ?? 0, userData?.lon ?? 0]}
                        route={!orderSelected ? [] : [
                            [orderSelected.motoboyLat, orderSelected.motoboyLon],
                            [orderSelected.restaurantLat, orderSelected.restaurantLon],
                            [orderSelected.customerLat, orderSelected.customerLon]
                        ]}
                        defaultPosition={[userData?.lat ?? 0, userData?.lon ?? 0]}
                    />
                </div>
            </div>
        </>
    );
};

export default OrderSolicitation;
