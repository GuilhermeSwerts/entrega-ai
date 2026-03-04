import { useEffect, useState } from 'react';
import { useUserData } from '../../context/UserDataContext';
import { Input, InputIcon } from '../../components/inputs/Input';
import Select from '../../components/inputs/Select';
import Button from '../../components/inputs/Button';
import { CustomerMe, UpdateCustomer } from '../../services/Customer/CustomerService';
import { restaurantTypes } from '../../util/dataMock';
import {
    User,
    Building2,
    FileText,
    Phone,
    Mail,
    Clock,
    Calendar,
    Utensils,
    Save,
    MapPin,
    Home
} from 'lucide-react';
import type { ICustomer } from '../../interface/ICustomer';
import { maskCep, maskCnpj, maskCpf, maskPhone } from '../../util/mask';
import { GetAddress } from '../../services/Address/Address';
import { api } from '../../services/api';
import type { IRoutes } from '../../interface/IRoutes';
import { useRoutes } from '../../context/RoutesContext';
import { normalizeTime } from '../../util/dataUtil';

const Profile = () => {
    const { userData, setUserData } = useUserData();
    const { setRoutesMap } = useRoutes();
    const [form, setForm] = useState<Partial<ICustomer>>({});

    useEffect(() => {
        if (userData && Object.keys(form).length === 0) {
            setForm({
                ...userData,
                passwordHash: ""
            });
        } else if (!userData && Object.keys(form).length === 0) {
            CustomerMe(data => {
                setUserData(data);
                data.passwordHash = ""
                setForm(data)
            })
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleChangeCep = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (value.length === 9) {
            GetAddress(value.replace('-', ''), (data) => {
                setForm(prev => ({
                    ...prev,
                    addressStreet: data.logradouro,
                    addressNeighborhood: data.bairro,
                    addressCity: data.localidade,
                    addressState: data.uf,
                    addressCountry: "BR",
                    addressZipCode: data.cep
                }))
            })
        } else
            setForm(prev => ({ ...prev, [name]: value }));
    }

    const handleDaysChange = (day: string) => {
        const currentDays = (form.businessDays || '').split('|').filter(Boolean);
        let newDays;
        if (currentDays.includes(day)) {
            newDays = currentDays.filter(d => d !== day);
        } else {
            newDays = [...currentDays, day];
        }
        setForm(prev => ({ ...prev, businessDays: newDays.join('|') }));
    };

   const handleSave = () => {
    const payload = {
        ...form,
        businessHoursStart: normalizeTime(form.businessHoursStart),
        businessHoursEnd: normalizeTime(form.businessHoursEnd),
    } as ICustomer;

    UpdateCustomer(payload, () => {
        api.get<IRoutes[]>(
            "Customer/Routes",
            response => {
                setRoutesMap(response);
            },
            true
        );
    });
};

    const businessDaysOptions = [
        { label: 'Seg', value: 'seg' },
        { label: 'Ter', value: 'ter' },
        { label: 'Qua', value: 'qua' },
        { label: 'Qui', value: 'qui' },
        { label: 'Sex', value: 'sex' },
        { label: 'Sáb', value: 'sab' },
        { label: 'Dom', value: 'dom' },
    ];

    if (!userData) return <div className="p-8 text-center text-gray-500">Carregando dados do perfil...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Dados da Empresa */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6 text-orange-600">
                            <Building2 size={24} />
                            <h2 className="text-xl font-semibold">Dados da Empresa</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputIcon
                                label="Razão Social"
                                name="companyName"
                                value={form.companyName || ''}
                                onChange={handleChange}
                                Icon={Building2}
                            />
                            <InputIcon
                                label="CNPJ"
                                name="cnpj"
                                value={maskCnpj(form.cnpj || '')}
                                onChange={handleChange}
                                Icon={FileText}
                                placeholder="00.000.000/0000-00"
                            />
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6 text-orange-600">
                            <User size={24} />
                            <h2 className="text-xl font-semibold">Dados do Responsável</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputIcon
                                label="Nome do Responsável"
                                name="responsibleName"
                                value={form.responsibleName || ''}
                                onChange={handleChange}
                                Icon={User}
                            />
                            <InputIcon
                                label="CPF"
                                name="responsibleCpf"
                                value={maskCpf(form.responsibleCpf || '')}
                                onChange={handleChange}
                                Icon={FileText}
                                placeholder="000.000.000-00"
                            />
                            <InputIcon
                                label="WhatsApp"
                                name="whatsapp"
                                value={maskPhone(form.whatsapp || '')}
                                onChange={handleChange}
                                Icon={Phone}
                                placeholder="(00) 00000-0000"
                            />
                            <InputIcon
                                label="E-mail"
                                name="email"
                                value={form.email || ''}
                                onChange={handleChange}
                                Icon={Mail}
                                placeholder="email@exemplo.com"
                            />
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6 text-orange-600">
                            <MapPin size={24} />
                            <h2 className="text-xl font-semibold">Endereço</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                                label="CEP"
                                name="addressZipCode"
                                value={maskCep(form.addressZipCode || '')}
                                onChange={handleChangeCep}
                                placeholder="00000-000"
                                maxLength={9}
                            />
                            <div className="md:col-span-2">
                                <InputIcon
                                    label="Rua"
                                    name="addressStreet"
                                    value={form.addressStreet || ''}
                                    onChange={handleChange}
                                    Icon={MapPin}
                                    placeholder="Nome da rua"
                                />
                            </div>
                            <InputIcon
                                label="Número"
                                name="addressNumber"
                                value={form.addressNumber || ''}
                                onChange={handleChange}
                                Icon={Home}
                                placeholder="123"
                            />
                            <Input
                                label="Complemento"
                                name="addressComplement"
                                value={form.addressComplement || ''}
                                onChange={handleChange}
                                placeholder="Apto, Sala, etc."
                            />
                            <Input
                                label="Bairro"
                                name="addressNeighborhood"
                                value={form.addressNeighborhood || ''}
                                onChange={handleChange}
                                placeholder="Nome do bairro"
                            />
                            <Input
                                label="Cidade"
                                name="addressCity"
                                value={form.addressCity || ''}
                                onChange={handleChange}
                                placeholder="Nome da cidade"
                            />
                            <Input
                                label="Estado"
                                name="addressState"
                                value={form.addressState || ''}
                                onChange={handleChange}
                                placeholder="UF"
                            />
                        </div>
                    </section>
                </div>

                {/* Funcionamento */}
                <div className="space-y-6">
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6 text-orange-600">
                            <Clock size={24} />
                            <h2 className="text-xl font-semibold">Funcionamento</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-3 block flex items-center gap-2">
                                    <Calendar size={16} /> Dias de Funcionamento
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {businessDaysOptions.map(option => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => handleDaysChange(option.value)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${(form.businessDays || '').split('|').includes(option.value)
                                                ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Início"
                                    type="time"
                                    name="businessHoursStart"
                                    value={form.businessHoursStart || ''}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Fim"
                                    type="time"
                                    name="businessHoursEnd"
                                    value={form.businessHoursEnd || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-4">
                                <Select
                                    label="Tipo de Restaurante"
                                    name="restaurantTypeId"
                                    value={form.restaurantTypeId || ''}
                                    onChange={handleChange}
                                    className="!w-full"
                                >
                                    <option value="">Selecione...</option>
                                    {restaurantTypes.map(type => (
                                        <option key={type.id_type_restaurant} value={type.id_type_restaurant}>
                                            {type.tx_name_restaurant}
                                        </option>
                                    ))}
                                </Select>

                                {form.restaurantTypeId === '59043132-e29d-48b3-ba8c-1aa6cccb3553' && (
                                    <InputIcon
                                        label="Outro Tipo"
                                        name="otherRestaurantType"
                                        value={form.otherRestaurantType || ''}
                                        onChange={handleChange}
                                        Icon={Utensils}
                                        placeholder="Especifique..."
                                    />
                                )}
                            </div>
                            <Button
                                onClick={handleSave}
                                className="flex items-center px-8 py-3 w-full w-full"
                            >
                                <div className="flex gap-2 items-center justify-center w-full">
                                    <Save size={20} />
                                    {'Salvar Alterações'}
                                </div>
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
