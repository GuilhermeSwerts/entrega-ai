import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { MapComponent } from './components/MapComponent';
import { Input, InputIcon } from '../../components/inputs/Input';
import Select from '../../components/inputs/Select';
import Button from '../../components/inputs/Button';
import { motion, AnimatePresence } from "framer-motion"
import {
    Hash,
    MapPin,
    Home,
    Plus,
    Trash2,
    Banknote,
    User,
    Phone,
    Mail,
    FileText,
    Utensils,
    Bike,
} from 'lucide-react';

const OrderSolicitation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [currentOrderSelected, setCurrentOrderSelected] = useState<number>(1);

    const [orderId, setOrderId] = useState('01');
    const [street, setStreet] = useState('Rua Paraguai, Jardim Raquel, Itatiba');
    const [number, setNumber] = useState('100');
    const [complement, setComplement] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Pago');
    const [deliveryFeeType, setDeliveryFeeType] = useState('Auto');
    const [deliveryFee, setDeliveryFee] = useState('');
    const [courierFeeType, setCourierFeeType] = useState('Auto');
    const [courierFee, setCourierFee] = useState('');
    const [orderValue, setOrderValue] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientName, setClientName] = useState('');
    const [orderDetails, setOrderDetails] = useState('');
    const [observations, setObservations] = useState('');
    const [reverseDelivery, setReverseDelivery] = useState(false);

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
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            key="collapse"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                <InputIcon
                                    label="Nº Pedido"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    Icon={Hash}
                                    placeholder="00"
                                />

                                <div className="md:col-span-2">
                                    <InputIcon
                                        label="Nome da Rua ou CEP (sem o número)"
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        Icon={MapPin}
                                        placeholder="Ex: Rua das Flores"
                                    />
                                </div>

                                <InputIcon
                                    label="Nº Rua"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    Icon={Home}
                                    placeholder="123"
                                />

                                <Input
                                    label="Complemento"
                                    value={complement}
                                    onChange={(e) => setComplement(e.target.value)}
                                    placeholder="Apto 101"
                                />

                                <div className="flex items-end pb-1 capitalize">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={reverseDelivery}
                                            onChange={(e) => setReverseDelivery(e.target.checked)}
                                            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                        />
                                        <span className="text-sm text-gray-600">Entrega reversa</span>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
                                <Select label="Pagamento em:" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="!w-full">
                                    <option value="Pago">Pedido Pago</option>
                                    <option value="Dinheiro">Dinheiro</option>
                                    <option value="Cartão">Cartão</option>
                                    <option value="PIX">PIX</option>
                                </Select>

                                <Input
                                    label="Taxa de Entrega:"
                                    value={deliveryFee}
                                    onChange={(e) => setDeliveryFee(e.target.value)}
                                    placeholder="0,00"
                                    disabled={deliveryFeeType === 'Auto'}
                                />

                                <InputIcon
                                    label="Valor do pedido:"
                                    value={orderValue}
                                    onChange={(e) => setOrderValue(e.target.value)}
                                    Icon={Banknote}
                                    placeholder="0,00"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <InputIcon
                                    label="Nome do cliente:"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    Icon={User}
                                    placeholder="Nome Completo"
                                />
                                <InputIcon
                                    label="Telefone do cliente:"
                                    value={clientPhone}
                                    onChange={(e) => setClientPhone(e.target.value)}
                                    Icon={Phone}
                                    placeholder="(00) 00000-0000"
                                />
                                <InputIcon
                                    label="Email do cliente:"
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                    Icon={Mail}
                                    placeholder="email@exemplo.com"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm text-gray-500 flex items-center gap-2">
                                        <FileText size={16} /> Detalhes do pedido:
                                    </label>
                                    <textarea
                                        value={orderDetails}
                                        onChange={(e) => setOrderDetails(e.target.value)}
                                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-24 resize-none"
                                        placeholder="Descreva os itens do pedido..."
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm text-gray-500">Observações:</label>
                                    <textarea
                                        value={observations}
                                        onChange={(e) => setObservations(e.target.value)}
                                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-24 resize-none"
                                        placeholder="Instruções adicionais..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-start gap-4 mt-6">
                                <Button className="flex items-center gap-2 px-8 py-3">
                                    <Plus size={20} /> Adicionar
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2 px-8 py-3">
                                    <Trash2 size={20} /> Limpar Local Selecionado
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    className="w-full flex justify-center items-center text-gray-800 rounded-md focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="mr-2">{!isOpen ? "Adicionar" : "Ocultar"}</span>
                    <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                </button>
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
                    {[1, 2, 3, 4].map(id_order => (
                        <div onClick={() => setCurrentOrderSelected(id_order)} key={id_order} className={`w-full p-2 border ${currentOrderSelected == id_order ? 'border-blue-400' : 'border-gray-400 '} hover:border-blue-400 cursor-pointer duration-500 mb-2 rounded-lg`}>
                            <span className='ml-2'>
                                Pedido N°: #{id_order}
                            </span>
                        </div>
                    ))}
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
