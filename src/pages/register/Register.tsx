import { Bike, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { InputIcon } from '../../components/inputs/Input';
import Stepper from '../../components/Stepper';
import { useRegister } from './hook/useRegister';
import {
    Building2,
    FileText,
    Clock,
    Utensils,
    User,
    Phone,
    Mail,
    Lock
} from 'lucide-react';
import SearchableSelect from '../../components/inputs/SearchableSelect';
import { ERestaurantTypes } from '../../lib/enum';
import Button from '../../components/inputs/Button';
import { Terms } from '../../util/dataUtil';
import { TokenInput } from '../../components/inputs/TokenInput';
import CheckboxSelect from '../../components/inputs/CheckboxSelect';
import { maskCnpj, maskCpf, maskPhone } from '../../util/mask';


const Register = () => {
    const {
        currentStep,
        scrolled,
        registerSteps,
        form,
        handleChange,
        errors,
        optionTypeRestaurant,
        setForm,
        optionDaysOfOperation,
        onRegister,
        setCurrentStep,
        onResent
    } = useRegister();

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-orange-500/30 font-sans">
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <Bike className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white italic" style={{ fontFamily: 'Outfit, sans-serif' }}>ENTREGA<span className="text-orange-500">.AI</span></span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="hover:text-orange-500 transition-colors">Voltar</Link>
                        <Link to="/login" className="hover:text-orange-500 transition-colors">Entrar</Link>
                    </div>
                </div>
            </nav>

            <div className="flex items-center justify-center min-h-screen">
                <div className="mt-20 md:mt-0 flex flex-col w-[90%]">
                    <Stepper
                        currentStep={currentStep}
                        steps={registerSteps}
                    />
                    <div className="mt-5 bg-white p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                        {currentStep === "CompanyData" && <>
                            <div>
                                <InputIcon
                                    Icon={Building2}
                                    label="Razão Social"
                                    placeholder="Nome da empresa"
                                    name="razaoSocial"
                                    value={form.razaoSocial}
                                    onChange={handleChange}
                                    required
                                />
                                {errors['razaoSocial'] && (
                                    <span className="text-xs text-red-500">
                                        {errors['razaoSocial']}
                                    </span>
                                )}
                            </div>
                            <div>
                                <InputIcon
                                    Icon={FileText}
                                    label="CNPJ"
                                    placeholder="00.000.000/0000-00"
                                    name="cnpj"
                                    value={maskCnpj(form.cnpj)}
                                    onChange={handleChange}
                                    maxLength={19}
                                    required
                                />
                                {errors['cnpj'] && (
                                    <span className="text-xs text-red-500">
                                        {errors['cnpj']}
                                    </span>
                                )}
                            </div>
                            <div>
                                <CheckboxSelect
                                    Icon={Calendar}
                                    label="Dias de funcionamento"
                                    options={optionDaysOfOperation}
                                    value={form.diasFuncionamento}
                                    onChange={value => {
                                        const event: any = {
                                            target: {
                                                name: 'diasFuncionamento',
                                                value,
                                            }
                                        }
                                        handleChange(event);
                                    }}
                                />
                            </div>
                            <div className='w-full flex gap-1 items-center'>
                                <InputIcon
                                    className='w-full'
                                    type='time'
                                    Icon={Clock}
                                    label="Horário de Funcionamento"
                                    placeholder="Ex: Seg a Sex - 08:00 às 18:00"
                                    name="horarioFuncionamentoInicio"
                                    value={form.horarioFuncionamentoInicio}
                                    onChange={handleChange}
                                />
                                <span className='mt-5 text-gray-600'>às</span>
                                <InputIcon
                                    type='time'
                                    Icon={Clock}
                                    label="Horário de Funcionamento"
                                    placeholder="Ex: Seg a Sex - 08:00 às 18:00"
                                    name="horarioFuncionamentoFim"
                                    value={form.horarioFuncionamentoFim}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <SearchableSelect
                                    Icon={Utensils}
                                    value={form.tipoRestaurante}
                                    onChange={value => {
                                        const event: any = {
                                            target: {
                                                name: 'tipoRestaurante',
                                                value,
                                            }
                                        }
                                        handleChange(event);
                                    }}
                                    options={optionTypeRestaurant}
                                    className='w-full'
                                    label="Tipo de Restaurante"
                                />
                            </div>
                            {form.tipoRestaurante === ERestaurantTypes.Outro.toString() && <div>
                                <InputIcon
                                    Icon={Utensils}
                                    label="Outro tipo de restaurante"
                                    placeholder="Especifique se for outro"
                                    name="tipoRestauranteOutro"
                                    value={form.tipoRestauranteOutro}
                                    onChange={handleChange}
                                />
                                {errors['tipoRestauranteOutro'] && (
                                    <span className="text-xs text-red-500">
                                        {errors['tipoRestauranteOutro']}
                                    </span>
                                )}

                            </div>}
                        </>}
                        {currentStep === "CompanyData" && <>
                            <div>
                                <InputIcon
                                    Icon={User}
                                    label="Nome do Responsável Legal"
                                    placeholder="Nome completo"
                                    name="nomeResponsavel"
                                    value={form.nomeResponsavel}
                                    onChange={handleChange}
                                    required
                                />
                                {errors['nomeResponsavel'] && (
                                    <span className="text-xs text-red-500">
                                        {errors['nomeResponsavel']}
                                    </span>
                                )}
                            </div>
                            <div>
                                <InputIcon
                                    Icon={FileText}
                                    label="CPF do Responsável Legal"
                                    placeholder="000.000.000-00"
                                    name="cpfResponsavel"
                                    value={maskCpf(form.cpfResponsavel)}
                                    onChange={handleChange}
                                    maxLength={14}
                                    required
                                />
                                {errors['cpfResponsavel'] && (
                                    <span className="text-xs text-red-500">
                                        {errors['cpfResponsavel']}
                                    </span>
                                )}
                            </div>
                        </>}
                        {currentStep === "CompanyData" && < >
                            <div>
                                <InputIcon
                                    Icon={Phone}
                                    label="WhatsApp"
                                    placeholder="(00) 00000-0000"
                                    name="whatsapp"
                                    value={maskPhone(form.whatsapp)}
                                    onChange={handleChange}
                                    maxLength={15}
                                />
                                {errors['whatsapp'] && (
                                    <span className="text-xs text-red-500">
                                        {errors['whatsapp']}
                                    </span>
                                )}
                            </div>
                            <div>
                                <InputIcon
                                    Icon={Mail}
                                    label="E-mail"
                                    placeholder="email@exemplo.com"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors['email'] && (
                                    <span className="text-xs text-red-500">
                                        {errors['email']}
                                    </span>
                                )}
                            </div>
                        </>}
                        {currentStep === "UserData" && <>
                            <div className="col-span-2">
                                <InputIcon
                                    disabled
                                    Icon={Mail}
                                    label="Código de confirmação chegará para o e-mail abaixo"
                                    placeholder="email@exemplo.com"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <InputIcon
                                    Icon={Lock}
                                    label="Senha"
                                    placeholder="Digite sua senha"
                                    type="password"
                                    name="senha"
                                    value={form.senha}
                                    onChange={handleChange}
                                    required
                                />
                                {errors['senha'] && (
                                    <span className="text-xs text-red-500">
                                        {errors['senha']}
                                    </span>
                                )}
                            </div>
                            <div>
                                <InputIcon
                                    Icon={Lock}
                                    label="Senha"
                                    placeholder="Confirme a sua senha"
                                    type="password"
                                    name="confirmaSenha"
                                    value={form.confirmaSenha}
                                    onChange={handleChange}
                                    required
                                />
                                {errors['senha'] && (
                                    <span className="text-xs text-red-500">
                                        {errors['senha']}
                                    </span>
                                )}
                            </div>
                        </>}
                        {currentStep === "EmailConfirmation" && <div className='col-span-2'>
                            <TokenInput
                                onComplete={(code) => onRegister(code)}
                                onResend={onResent}
                                label={`Um e-mail com o código de validação foi enviado para ${form.email}.  
Verifique sua caixa de entrada e, se necessário, a pasta de spam.
`}
                                length={6}
                            />
                        </div>}
                    </div>
                    {currentStep === "CompanyData" &&
                        <>
                            <label className="mt-5 flex items-start gap-3 text-sm text-gray-700">
                                <input
                                    checked={form.terms}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            terms: e.target.checked,
                                        })
                                    }
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                                />

                                <span>
                                    Li, estou ciente e aceito todos os{" "}
                                    {Terms.map((link, index) => (
                                        <span key={index}>
                                            <a
                                                target="_blank"
                                                href={link.href}
                                                className="font-semibold text-gray-600 hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                            {index < Terms.length - 1 && ", "}
                                        </span>
                                    ))}
                                </span>
                            </label>
                            {errors['terms'] && (
                                <span className="text-xs text-red-500">
                                    {errors['terms']}
                                </span>
                            )}
                        </>
                    }
                    <div className="flex flex-col md:flex-row gap-5 items-center">
                        {currentStep !== "CompanyData" && <Button
                            onClick={() => {
                                if (currentStep === "UserData")
                                    setCurrentStep("CompanyData")
                                if (currentStep === "EmailConfirmation")
                                    setCurrentStep("UserData")
                            }}
                            variant='outline' className='mt-5 w-full'>
                            Voltar
                        </Button>}
                        <Button onClick={() => onRegister()} className='mt-5 w-full'>
                            {currentStep === "EmailConfirmation" ? 'Enviar' : 'Continuar'}
                        </Button>
                    </div>
                </div>
            </div>
            <br />
        </div>
    )
}

export default Register