import React from 'react';

type SelectProps = {
    label: string;
    children: React.ReactNode;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className?: string;
    hiddenDefaultValue?: boolean;
    name?: string;
};

const Select: React.FC<SelectProps> = ({ children, label, onChange, value, className = "", hiddenDefaultValue, name }) => {
    return (
        <div className="w-full flex flex-col space-y-1">
            <label htmlFor="category" className="text-sm text-gray-500">
                {label}
            </label>
            <select
                onChange={onChange}
                value={value}
                id="category"
                name={name}
                className={`w-64 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            >
                {!hiddenDefaultValue && <option value="">Selecione</option>}
                {children}
            </select>
        </div>
    );
};

export default Select;
