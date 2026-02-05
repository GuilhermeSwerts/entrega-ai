import { useEffect, useRef, useState } from 'react';
import type { OptionType } from '../../types/SearchableSelect';
import type { IconType } from 'react-icons';
import { Input } from './Input';

type SearchableSelectProps = {
    options: OptionType[],
    value: string,
    onChange: (value: string) => void;
    className?: string
    label: string
    Icon?: IconType;
}
export default function SearchableSelect({ options, onChange, value, className, label, Icon }: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    const getTitle = () => {
        if (!value || value == "0") return 'Selecione';
        return options.find(x => x.value === value)?.label;
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearch('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            <label className="text-sm text-gray-500">{label}</label>
            <div
                className={`${Icon && 'realative'} w-64 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                onClick={() => setIsOpen(prev => !prev)}
            >
                {Icon && <Icon size={20} className="z-2 absolute left-3 top-9 text-slate-400" />}
                <span className={`${Icon && 'ml-6'} text-gray-400`}>{getTitle()}</span>
            </div>

            {isOpen && (
                <div
                    className={`absolute z-10 w-64 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm ${className}`}
                >
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
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                        setSearch('');
                                    }}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {option.label}
                                </li>
                            ))
                        ) : (
                            <li className="px-3 py-2 text-gray-400">Nenhum resultado</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}