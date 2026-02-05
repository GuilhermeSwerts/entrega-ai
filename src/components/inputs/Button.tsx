import React from 'react';
import clsx from 'clsx';
import type { ButtonVariant } from '../../types/ui/Button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    className,
    disabled,
    ...props
}) => {
    const baseClasses =
        'px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants: Record<ButtonVariant, string> = {
        primary:
            'cursor-pointer bg-orange-500 text-white hover:bg-orange-700 focus:ring-orange-500',
        secondary:
            'cursor-pointer bg-orange-200 text-orange-800 hover:bg-orange-300 focus:ring-orange-400',
        danger:
            'cursor-pointer bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        outline:
            'cursor-pointer border border-orange-400 text-orange-500 bg-transparent hover:bg-orange-100 focus:ring-orange-400',
        ghost:
            'cursor-pointer bg-transparent text-orange-500 hover:bg-orange-100 focus:ring-orange-300',
    };

    const disabledClasses = 'opacity-50 cursor-not-allowed';

    return (
        <button
            className={clsx(
                baseClasses,
                variants[variant],
                disabled && disabledClasses,
                className
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
