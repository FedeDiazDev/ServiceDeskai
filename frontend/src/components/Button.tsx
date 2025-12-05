type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
interface ButtonProps {
    children: React.ReactNode;
    type: ButtonType;
    onClick?: () => void;
    disabled?: boolean;
    variant?: ButtonVariant;
    isLoading?: boolean;
}

export default function Button({ children, type, onClick, disabled = false, variant = 'primary', isLoading = false }: ButtonProps) {
    const baseStyles = 'rounded-xl p-4 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white',
        secondary: 'bg-gray-100 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-dark-text-main border border-gray-300 dark:border-dark-border',
        tertiary: 'bg-transparent hover:bg-gray-100 dark:hover:bg-dark-surface text-primary-600 dark:text-primary-400',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variantStyles[variant]}`}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Cargando...
                </span>
            ) : children}
        </button>
    );
}