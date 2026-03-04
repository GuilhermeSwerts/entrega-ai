import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import type { IconType } from "react-icons";
import { NumericFormat } from "react-number-format";
export type InputTypes = [
    'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' |
    'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' |
    'checkbox' | 'radio' | 'range' | 'file' | 'hidden' |
    'submit' | 'reset' | 'button' | 'image'
][number];

export const inputBaseClassName = `w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500`

export type InputIconProps = InputProps & {
    Icon: IconType;
};

type InputProps = {
    value: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    placeholder?: string;
    type?: InputTypes;
    label?: string;
    required?: boolean;
    accept?: string;
    min?: number | undefined;
    max?: number | undefined;
    multiple?: boolean;
    disabled?: boolean;
    name?: string;
    id?: string;
    className?: string;
    width?: string;
    pattern?: string;
    maxLength?: number;
};

export const InputIcon: React.FC<InputIconProps> = ({
    value,
    onChange,
    placeholder = '',
    type = 'text',
    label = "",
    required = false,
    multiple = false,
    accept = '*',
    disabled = false,
    Icon,
    id,
    max,
    min,
    name,
    width,
    pattern,
    maxLength
}) => {
    return (
        <div className="flex flex-col space-y-1 w-full">
            {label && <label htmlFor="category" className="text-sm text-gray-500">
                {label} {required && <span className='text-primary'>* Obrigatório</span>}
            </label>}
            <div className="relative">
                <Icon size={20} className="z-2 absolute left-3 top-3 text-slate-400" />
                <Input
                    id={id}
                    max={max}
                    min={min}
                    name={name}
                    key={id}
                    disabled={disabled}
                    accept={accept}
                    multiple={multiple}
                    required={required}
                    onChange={onChange}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    width={width}
                    pattern={pattern}
                    maxLength={maxLength}
                    className='pl-10 pr-3 py-2'
                />
            </div>
        </div>
    );
};



export const Input: React.FC<InputProps> = ({
    value,
    onChange,
    placeholder = '',
    type = 'text',
    label = "",
    required = false,
    multiple = false,
    accept = '*',
    disabled = false,
    id,
    max,
    min,
    name,
    className,
    width,
    pattern,
    maxLength
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={`flex flex-col space-y-1 ${width}`}>
            {label && (
                <label htmlFor={id} className="text-sm text-gray-500">
                    {label} {required && <span className='text-primary'>* Obrigatório</span>}
                </label>
            )}
            <div className="relative">
                <input
                    maxLength={maxLength}
                    id={id}
                    max={max}
                    min={min}
                    name={name}
                    key={id}
                    disabled={disabled}
                    accept={accept}
                    multiple={multiple}
                    required={required}
                    onChange={onChange}
                    type={inputType}
                    value={value}
                    placeholder={placeholder}
                    pattern={pattern}
                    className={`w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? 'bg-gray-100' : 'bg-white'} ${className}`}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>
        </div>
    );
};


type InputPriceProps = {
    value?: number;
    onChangeValue?: (value: number) => void;
    prefix: string;
    label?: string
    divClassName?: string
    disabled?: boolean;
    required?: boolean;
};
export const InputPrice: React.FC<InputPriceProps> = ({ required, divClassName, prefix, onChangeValue, value, label, disabled }) => (
    <div className={`flex flex-col space-y-1 ${divClassName}`}>
        {label && <label htmlFor="category" className="text-sm text-gray-500">
            {label} {required && <span className='text-primary'>* Obrigatório</span>}
        </label>}
        <NumericFormat
            disabled={disabled}
            value={value}
            thousandSeparator="."
            decimalSeparator=","
            prefix={`${prefix} `}
            decimalScale={2}
            onValueChange={({ floatValue }) => onChangeValue?.(floatValue || 0)}
            placeholder="Digite o valor"
            className={`w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? 'bg-gray-50' : 'bg-white'}`}
        />
    </div>
);