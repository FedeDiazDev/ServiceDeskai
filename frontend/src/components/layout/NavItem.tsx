import { NavLink } from "react-router-dom";
import { NavItemConfig } from "../../config/navItems";

interface NavItemProps {
    item: NavItemConfig;
    variant: "sidebar" | "bottom";
}

export default function NavItem({ item, variant }: NavItemProps) {
    const Icon = item.icon;

    if (variant === "bottom") {
        return (
            <NavLink
                to={item.to}
                className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-gray-500 dark:text-dark-text-muted hover:text-gray-700 dark:hover:text-dark-text-main"
                    }`
                }
            >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
        );
    }

    return (
        <NavLink
            to={item.to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                        ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium"
                        : "text-gray-600 dark:text-dark-text-muted hover:bg-gray-100 dark:hover:bg-dark-border"
                }`
            }
        >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
        </NavLink>
    );
}
