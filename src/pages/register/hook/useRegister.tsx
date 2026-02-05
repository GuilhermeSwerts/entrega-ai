import { useEffect, useState } from "react";
import type { RegisterStepType } from "../../../types/Register";
import type { StepConfig } from "../../../components/Stepper";
import type { ICustomerRegister } from "../../../interface/Register";
import { useGenericFormValidator, type ValidationRulesType } from "../../../globalHook/useGenericFormValidator";
import type { OptionType } from "../../../types/SearchableSelect";
import { restaurantTypes } from "../../../util/dataMock";
import { PatternEnum } from "../../../lib/enum";
import { RegisterCustomer, ResentValidationCode, ValidationCodeEmail } from "../../../services/Customer/CustomerService";

const ruleCompanyData = {
    razaoSocial: {
        required: true,
    },
    cnpj: {
        required: true,
        message: 'CNPJ inválido',
        pattern: PatternEnum.cnpj
    },
    nomeResponsavel: {
        required: true,
        message: 'Digite O Nome completo',
        pattern: PatternEnum.fullName
    },
    cpfResponsavel: {
        required: true,
        message: 'CPF inválido',
        pattern: PatternEnum.cpf
    },
    email: {
        required: true,
        message: 'E-mail inválido',
        pattern: PatternEnum.email
    },
    terms: {
        required: true,
    }
}
const ruleUserData = {
    senha: {
        required: true,
        pattern: PatternEnum.password,
        message: 'A senha deve conter no mínimo 8 caracteres, incluindo: 1 letra maiúscula, 1 letra minúscula, 1 número, 1 caractere especial (ex: @ # ! $)',
    },
    confirmaSenha: {
        required: true,
        pattern: PatternEnum.password,
        message: 'A senha deve conter no mínimo 8 caracteres, incluindo: 1 letra maiúscula, 1 letra minúscula, 1 número, 1 caractere especial (ex: @ # ! $)',
    },
}

export const useRegister = () => {
    const [id_customer, setIdCustomer] = useState<string>('');

    const [scrolled, setScrolled] = useState(false);
    const [currentStep, setCurrentStep] = useState<RegisterStepType>("CompanyData");
    const [dynamicRules, setDynamicRules] = useState<{ [key: string]: ValidationRulesType }>({});

    const registerSteps = [
        { key: "CompanyData", label: "Empresa" },
        { key: "UserData", label: "Usuário" },
        { key: "EmailConfirmation", label: "Autenticação" },
    ] satisfies StepConfig<RegisterStepType>[];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onAddRules = (newRule: { [key: string]: ValidationRulesType }) => setDynamicRules(prv => ({ ...prv, ...newRule }));

    useEffect(() => {
        switch (currentStep) {
            case "CompanyData":
                setDynamicRules(ruleCompanyData)
                break;
            case "UserData":
                onAddRules(ruleUserData)
                break;
            default:
                break;
        }

    }, [currentStep])

    const initialForm: ICustomerRegister = {
        razaoSocial: '',
        cnpj: '',
        diasFuncionamento: [],
        horarioFuncionamentoInicio: '',
        horarioFuncionamentoFim: '',
        tipoRestaurante: '',
        tipoRestauranteOutro: '',
        nomeResponsavel: '',
        cpfResponsavel: '',
        whatsapp: '',
        email: '',
        senha: '',
        confirmaSenha: '',
        terms: false
    };

    const { errors, form, handleChange, setForm, validate } = useGenericFormValidator(initialForm, dynamicRules);

    const optionTypeRestaurant: OptionType[] = restaurantTypes.map(x => ({
        label: x.tx_name_restaurant,
        value: x.id_type_restaurant
    }))

    const optionDaysOfOperation: OptionType[] = [
        { label: 'Seg', value: 'seg' },
        { label: 'Ter', value: 'ter' },
        { label: 'Qua', value: 'qua' },
        { label: 'Qui', value: 'qui' },
        { label: 'Sex', value: 'sex' },
        { label: 'Sab', value: 'sab' },
        { label: 'Dom', value: 'dom' }
    ]

    const onRegister = (code?: string) => {
        var isValid = validate()

        if (!isValid)
            return;

        if (currentStep === "CompanyData")
            setCurrentStep("UserData")

        if (currentStep === "UserData") {

            if (currentStep === "UserData") {
                RegisterCustomer(form, (id_customer: string) => {
                    setIdCustomer(id_customer)
                    setCurrentStep("EmailConfirmation");
                })
            }
        }

        if (currentStep === "EmailConfirmation" && code) {
            ValidationCodeEmail(id_customer, code)
        }

    }

    const onResent = () => ResentValidationCode(id_customer);

    return {
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
    }
}