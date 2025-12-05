import { useAuth } from "../../context/AuthContext";
import { navItems, filterNavItemsByRole } from "../../config/navItems";
import NavItem from "./NavItem";

export default function BottomNav() {
    const { user } = useAuth();
    const filteredItems = filterNavItemsByRole(navItems, user?.role, true);

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border md:hidden z-50">
            <div className="flex justify-around items-center h-16">
                {filteredItems.map((item) => (
                    <NavItem key={item.to} item={item} variant="bottom" />
                ))}
            </div>
        </nav>
    );
}
