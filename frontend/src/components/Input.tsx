import { LucideIcon } from "lucide-react";

type InputTypes = "text" | "password" | "email" | "number";

interface InputProps {
    type: InputTypes;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    icon?: LucideIcon;
}

export default function Input({ type, value, onChange, label, placeholder, error, required, icon: Icon }: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-gray-700 dark:text-dark-text-muted">
                    {label} {required && <span className="text-status-high-text">*</span>}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-dark-text-muted" />
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full bg-gray-100 dark:bg-dark-surface rounded-xl p-4 ${Icon ? 'pl-12' : ''} focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-dark-text-main font-medium ${error ? 'border-2 border-status-high-border' : ''}`}
                />
            </div>
            {error && (
                <span className="text-sm text-status-high-text">{error}</span>
            )}
        </div>
    );
}