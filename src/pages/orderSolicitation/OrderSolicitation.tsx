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

const OrderSolicitation = () => {
    const { modalNewSolicitationRef, deliveryMotoboys, setDeliveryMotoboys } = useOrderSolicitation()

    // Mock data for map
    const mockMotoboys: Array<{ id: string; position: [number, number]; name: string; status: 'available' | 'busy' }> = [
        { id: '1', position: [-23.5505, -46.6333], name: 'João Silva', status: 'available' },
        { id: '2', position: [-23.555, -46.64], name: 'Maria Oliveira', status: 'busy' },
    ];

    const mockOrderLocation: [number, number] = [-23.56, -46.65];
    const mockRestaurantLocation: [number, number] = [-23.55, -46.63];
    const mockRoute: Array<[number, number]> = [
        mockRestaurantLocation,
        mockOrderLocation,
    ];

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
            <div className="grid grid-cols-4">
                <div className='flex flex-col items-center justify-center'>
                    {createCustomIcon(<Utensils size={20} />, "#ffffff", "#10b981")}
                    <span className='text-gray-400'>Restaurante</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    {createCustomIcon(<Bike size={20} />, "#64748b", "#f1f5f9")}
                    <span className='text-gray-400'>Motoboys Próximos</span>
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

            <div className="flex gap-6 h-[500px]">
                <div className='w-[25%] h-[500px] overflow-auto bg-white h-full p-5 rounded-3xl'>
                    <span className='text-gray-400'>Pedidos Em Andamento:</span>
                    {deliveryMotoboys.length === 0 && "Procurando motoboy"}
                    {deliveryMotoboys.length > 0 && deliveryMotoboys[0]?.distanceKm + " " + deliveryMotoboys[0]?.distanceTime }
                    {/* {deliveryMotoboys.map(order => (
                        <div onClick={() => (order)} key={order.idDeliveryRequestMotoboy} className={`w-full p-2 border ${true ? 'border-blue-400' : 'border-gray-400 '} hover:border-blue-400 cursor-pointer duration-500 mb-2 rounded-lg`}>
                            <span className='ml-2'>
                                Pedido N°: #{order.idDeliveryRequestMotoboy}
                            </span>
                        </div>
                    ))} */}
                </div>
                <div className="w-[75%] lg:col-span-9 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                    <MapComponent
                        motoboys={mockMotoboys}
                        orderLocation={mockOrderLocation}
                        restaurantLocation={mockRestaurantLocation}
                        route={mockRoute}
                    />
                </div>
            </div>
        </>
    );
};

export default OrderSolicitation;
