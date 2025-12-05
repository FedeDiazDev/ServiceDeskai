import { Ticket, PlusCircle, Users, Building2, Settings, LucideIcon } from "lucide-react";

export interface NavItemConfig {
    to: string;
    icon: LucideIcon;
    label: string;
    roles?: ('admin' | 'user' | 'service')[];  // Si no se especifica, visible para todos
    hideOnMobile?: boolean;
}

export const navItems: NavItemConfig[] = [
    { to: "/tickets", icon: Ticket, label: "Tickets" },
    { to: "/tickets/new", icon: PlusCircle, label: "Nuevo Ticket" },
    { to: "/users", icon: Users, label: "Usuarios", roles: ["admin"], hideOnMobile: true },
    { to: "/offices", icon: Building2, label: "Oficinas", roles: ["admin"], hideOnMobile: true },
    { to: "/settings", icon: Settings, label: "Ajustes" },
];

export const filterNavItemsByRole = (
    items: NavItemConfig[], 
    userRole: string | undefined,
    excludeHiddenOnMobile: boolean = false
): NavItemConfig[] => {
    return items.filter(item => {
        if (excludeHiddenOnMobile && item.hideOnMobile) return false;
        if (!item.roles) return true;
        return userRole && item.roles.includes(userRole as 'admin' | 'user' | 'service');
    });
};
