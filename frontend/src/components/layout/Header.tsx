import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Sun, Moon, LogOut, ChevronDown, Wrench } from "lucide-react";

export default function Header() {
    const { user, logout } = useAuth();
    const [darkMode, setDarkMode] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', String(newMode));
        document.documentElement.classList.toggle('dark');
    };

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
    };

    const getInitials = () => {
        if (!user) return '??';
        return `${user.name.charAt(0)}${user.surname.charAt(0)}`.toUpperCase();
    };

    return (
        <header className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border px-4 py-3 sticky top-0 z-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Wrench className="w-6 h-6 text-primary-600" />
                    <span className="font-bold text-lg text-gray-900 dark:text-dark-text-main hidden sm:block">
                        ServiceDesk
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <Sun className="w-5 h-5 text-yellow-500" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-600" />
                        )}
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
                                {getInitials()}
                            </div>
                            <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-dark-text-muted transition-transform hidden sm:block ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {dropdownOpen && (
                            <>
                                <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => setDropdownOpen(false)}
                                />
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-surface rounded-lg shadow-lg border border-gray-200 dark:border-dark-border z-20">
                                    <div className="p-3 border-b border-gray-200 dark:border-dark-border">
                                        <p className="font-medium text-gray-900 dark:text-dark-text-main">
                                            {user?.name} {user?.surname}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-dark-text-muted">
                                            {user?.email}
                                        </p>
                                        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                                            {user?.role}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-dark-border transition-colors rounded-b-lg"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Cerrar sesión
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
