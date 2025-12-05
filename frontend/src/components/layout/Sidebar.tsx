import { useAuth } from "../../context/AuthContext";
import { navItems, filterNavItemsByRole } from "../../config/navItems";
import NavItem from "./NavItem";

export default function Sidebar() {
    const { user } = useAuth();
    const filteredItems = filterNavItemsByRole(navItems, user?.role);

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-dark-border min-h-[calc(100vh-57px)]">
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {filteredItems.map((item) => (
                        <li key={item.to}>
                            <NavItem item={item} variant="sidebar" />
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
