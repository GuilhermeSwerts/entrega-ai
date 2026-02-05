import { useEffect, useRef, useState } from 'react';
import type { OptionType } from '../../types/SearchableSelect';
import type { IconType } from 'react-icons';
import { Input } from './Input';

type CheckboxSelectProps = {
    options: OptionType[];
    value: string[];
    onChange: (values: string[]) => void;
    className?: string;
    label: string;
    Icon?: IconType;
};

export default function CheckboxSelect({
    options,
    value,
    onChange,
    className,
    label,
    Icon,
}: CheckboxSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    const toggleValue = (val: string) => {
        if (value.includes(val)) {
            onChange(value.filter(v => v !== val));
        } else {
            onChange([...value, val]);
        }
    };

    const getTitle = () => {
        if (!value.length) return 'Selecione';
        if (value.length === 1) {
            return options.find(o => o.value === value[0])?.label;
        }
        return `${value.length} selecionados`;
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setSearch('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            <label className="text-sm text-gray-500">{label}</label>

            <div
                className={`${Icon && 'relative'} w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer ${className}`}
                onClick={() => setIsOpen(prev => !prev)}
            >
                {Icon && (
                    <Icon size={20} className="absolute left-3 top-3 text-slate-400" />
                )}
                <span className={`${Icon && 'ml-6'} text-gray-500`}>
                    {getTitle()}
                </span>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-64 mt-1 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
                    <Input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar..."
                        className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
                    />

                    <ul className="max-h-40 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <li
                                    key={option.value}
                                    className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                                    onClick={() => toggleValue(option.value)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={value.includes(option.value)}
                                        onChange={() => toggleValue(option.value)}
                                        className="cursor-pointer"
                                    />
                                    <span className='text-gray-600'>{option.label}</span>
                                </li>
                            ))
                        ) : (
                            <li className="px-3 py-2 text-gray-400">
                                Nenhum resultado
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
