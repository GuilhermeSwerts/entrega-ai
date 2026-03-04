import { useState } from 'react';
import { maskCpf, maskDate, maskPhone } from '../util/mask';

export type ValidationRulesType = {
    required: boolean;
    message?: string,
    pattern?: RegExp
}

export type ValidationRule<T> = {
    required?: boolean;
    pattern?: RegExp;
    message?: string;
    custom?: (value: any, form: T) => string | null | undefined;
};

type ValidationRules<T> = {
    [K in keyof T]?: ValidationRule<T>;
};

export type Errors<T> = {
    [K in keyof T]?: string;
};

export const useGenericFormValidator = <T extends Record<string, any>>(
    initialForm: T,
    validationRules: ValidationRules<T> = {}
) => {
    const [form, setForm] = useState<T>(initialForm);
    const [errors, setErrors] = useState<Errors<T>>({});

    const validate = (fieldValues: Partial<T> = form) => {
        const tempErrors: Errors<T> = { ...errors };

        Object.keys(fieldValues).forEach((key) => {
            const field = key as keyof T;
            const value = fieldValues[field];
            const rules = validationRules[field];

            if (rules?.required && !value) {
                tempErrors[field] = 'Campo obrigatório';
            } else if (rules?.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
                tempErrors[field] = rules.message || 'Formato inválido';
            } else if (rules?.custom && typeof rules.custom === 'function') {
                const customMessage = rules.custom(value, form);
                if (customMessage) tempErrors[field] = customMessage;
                else delete tempErrors[field];
            } else {
                delete tempErrors[field];
            }
        });

        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => !x);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        const maskedValue =
            name === 'cpf'
                ? maskCpf(value)
                : name === 'phone'
                    ? maskPhone(value)
                    : name === 'dateOfBirth'
                        ? maskDate(value)
                        : value;

        const updatedForm = { ...form, [name]: maskedValue } as T;
        setForm(updatedForm);
        validate({ [name]: value } as Partial<T>);
    };

    return {
        form,
        errors,
        handleChange,
        validate,
        setForm,
        setErrors,
    };
};

export function isOfLegalAge(date_of_birth: string) {
    const [ano, mes, dia] = date_of_birth.split('-').map(Number)

    const birth = new Date(ano, mes - 1, dia)
    const now = new Date()

    let age = now.getFullYear() - birth.getFullYear()
    const m = now.getMonth() - birth.getMonth()

    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
        age--
    }

    return age >= 18
}

export function GetFieldsRequireds<T>(
  keys: (keyof T)[]
): Record<(typeof keys)[number], { required: true }> {

  return keys.reduce((acc, key) => {
    acc[key] = { required: true };
    return acc;
  }, {} as Record<(typeof keys)[number], { required: true }>);
}