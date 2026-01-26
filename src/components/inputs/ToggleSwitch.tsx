
export type ToggleSwitchProps = {
    label?: string;
    setEnabled: (value: boolean) => void;
    enabled: boolean;
    disabled?: boolean;
    inLine?: boolean;
}

const ToggleSwitch = ({ label, setEnabled, enabled, disabled, inLine }: ToggleSwitchProps) => {

    return (
        <div className={`flex ${inLine ? 'flex-row items-center gap-2' : 'space-y-1 flex-col'}`}>
            {label && <label htmlFor="category" className="text-sm text-gray-500">
                {label}
            </label>}
            <label className="inline-flex items-center cursor-pointer">
                <input
                    disabled={disabled}
                    type="checkbox"
                    className="sr-only"
                    checked={enabled}
                    onChange={() => { setEnabled(!enabled) }}
                />
                <div className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${enabled ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${enabled ? 'translate-x-6' : ''}`}
                    ></div>
                </div>
            </label>
        </div>
    );
};

export { ToggleSwitch };
