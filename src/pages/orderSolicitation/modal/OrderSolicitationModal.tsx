import { FileText, Hash, Home, Mail, MapPin, Phone, User } from 'lucide-react';
import { InputIcon, Input, InputPrice } from '../../../components/inputs/Input';
import Modal from '../../../components/inputs/Modal'
import { maskCep, maskPhone, maskValue } from '../../../util/mask';
import { useOrderSolicitationModal } from '../hook/useOrderSolicitationModal';
import { BiMoney } from 'react-icons/bi';
import Button from '../../../components/inputs/Button';
import Stepper from '../../../components/Stepper';
import type { IDeliveryRequestMotoboy } from '../../../interface/IDeliveryRequestMotoboy';

type OrderSolicitationModalProps = {
    modalRef: React.RefObject<Modal | null>,
    setDeliveryMotoboys: React.Dispatch<React.SetStateAction<IDeliveryRequestMotoboy[]>>
}

const OrderSolicitationModal = ({ modalRef, setDeliveryMotoboys }: OrderSolicitationModalProps) => {
    const { setForm, steps, form, handleChange, errors, handleChangeCep, lastStep, nexStep } = useOrderSolicitationModal({ setDeliveryMotoboys,modalRef })

    return (
        <Modal
            title='Nova solicitação'
            hiddenButton
            ref={modalRef}
            isFullScreen
        >
            <Stepper
                currentStep={steps}
                steps={[
                    { key: "OrderData", label: "Dados do pedido" },
                    { key: "PaymentData", label: "Dados do pagamento" },
                    { key: "CustomerData", label: "Dados do cliente" },
                    { key: "AddressData", label: "Dados do endereço" },
                ]}
            />
            <div className="m-5"></div>
            {steps === "OrderData" && <div className="">
                <div>
                    <InputIcon
                        name='numOrder'
                        label="Nº Pedido"
                        value={form.numOrder}
                        onChange={handleChange}
                        Icon={Hash}
                        placeholder="00"
                    />
                    {errors["numOrder"] && <span className='text-red-500'>{errors["numOrder"]}</span>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-500 flex items-center gap-2">
                            <FileText size={16} /> Detalhes do pedido:
                        </label>
                        <textarea
                            name='deliveryRequestDetails'
                            value={form.deliveryRequestDetails}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-24 resize-none"
                            placeholder="Descreva os itens do pedido..."
                        />
                        {errors["deliveryRequestDetails"] && <span className='text-red-500'>{errors["deliveryRequestDetails"]}</span>}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-500">Observações:</label>
                        <textarea
                            name='deliveryRequestObservation'
                            value={form.deliveryRequestObservation}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-24 resize-none"
                            placeholder="Instruções adicionais..."
                        />
                    </div>
                </div>
            </div>}
            {steps === "PaymentData" && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <InputPrice
                        label="Taxa de entrega"
                        value={form.deliveryFee}
                        onChangeValue={value => setForm({
                            ...form,
                            "deliveryFee": value
                        })}
                        prefix='R$'
                    />
                    {errors["deliveryFee"] && <span className='text-red-500'>{errors["deliveryFee"]}</span>}
                </div>
                <div>
                    <InputPrice
                        label="Nº Pedido"
                        value={form.orderValue}
                        onChangeValue={value => setForm({
                            ...form,
                            "orderValue": value
                        })}
                        prefix='R$'
                    />
                    {errors["orderValue"] && <span className='text-red-500'>{errors["orderValue"]}</span>}
                </div>
            </div>}
            {steps === "CustomerData" && <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
                <div>
                    <InputIcon
                        name='recipientName'
                        label="Nome do cliente:"
                        value={form.recipientName.toUpperCase()}
                        onChange={handleChange}
                        Icon={User}
                        placeholder="Ex: João"
                    />
                    {errors["recipientName"] && <span className='text-red-500'>{errors["recipientName"]}</span>}
                </div>
                <div>
                    <InputIcon
                        name='recipientPhone'
                        label="Telefone do cliente:"
                        value={maskPhone(form.recipientPhone)}
                        onChange={handleChange}
                        Icon={Phone}
                        placeholder="(00) 00000-0000"
                    />
                    {errors["recipientPhone"] && <span className='text-red-500'>{errors["recipientPhone"]}</span>}
                </div>
                <InputIcon
                    name='recipientEmail'
                    label="Email do cliente:"
                    value={form.recipientEmail}
                    onChange={handleChange}
                    Icon={Mail}
                    placeholder="email@exemplo.com"
                />
            </div>}
            {steps === "AddressData" && <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
                <div>
                    <Input
                        label="CEP"
                        name="zipCode"
                        value={maskCep(form.zipCode || '')}
                        onChange={handleChangeCep}
                        placeholder="00000-000"
                        maxLength={9}
                    />
                    {errors["zipCode"] && <span className='text-red-500'>{errors["zipCode"]}</span>}
                </div>
                <div className="md:col-span-3">
                    <div>
                        <InputIcon
                            label="Rua"
                            name="address"
                            value={form.address || ''}
                            onChange={handleChange}
                            Icon={MapPin}
                            placeholder="Nome da rua"
                        />
                    </div>
                    {errors["address"] && <span className='text-red-500'>{errors["address"]}</span>}
                </div>
                <div className="md:col-span-1">
                    <InputIcon
                        label="Número"
                        name="numberAddress"
                        value={form.numberAddress || ''}
                        onChange={handleChange}
                        Icon={Home}
                        placeholder="123"
                    />
                    {errors["numberAddress"] && <span className='text-red-500'>{errors["numberAddress"]}</span>}
                </div>
                <div className="md:col-span-2">
                    <Input
                        label="Complemento"
                        name="complementAddress"
                        value={form.complementAddress || ''}
                        onChange={handleChange}
                        placeholder="Apto, Sala, etc."
                    />
                </div>
                <div>
                    <Input
                        label="Bairro"
                        name="neighborhood"
                        value={form.neighborhood || ''}
                        onChange={handleChange}
                        placeholder="Nome do bairro"
                    />
                    {errors["neighborhood"] && <span className='text-red-500'>{errors["neighborhood"]}</span>}
                </div>
                <div>
                    <Input
                        label="Cidade"
                        name="city"
                        value={form.city || ''}
                        onChange={handleChange}
                        placeholder="Nome da cidade"
                    />
                    {errors["city"] && <span className='text-red-500'>{errors["city"]}</span>}
                </div>
                <div>
                    <Input
                        label="Estado"
                        name="uf"
                        value={form.uf || ''}
                        onChange={handleChange}
                        placeholder="UF"
                    />
                    {errors["uf"] && <span className='text-red-500'>{errors["uf"]}</span>}
                </div>
            </div>}

            <div className='mt-5 flex justify-between gap-2 items-center'>
                <Button onClick={lastStep} variant='outline'>
                    Voltar
                </Button>
                <Button onClick={nexStep}>
                    {steps !== "AddressData" ? 'Continuar' : 'Enviar'}
                </Button>
            </div>
        </Modal>
    )
}

export default OrderSolicitationModal