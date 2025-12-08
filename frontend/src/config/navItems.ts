import { Ticket, PlusCircle, Users, Building2, Settings, LucideIcon } from "lucide-react";

export interface NavItemConfig {
    to: string;
    icon: LucideIcon;
    label: string;
    roles?: ('admin' | 'user' | 'service')[];
    hideOnMobile?: boolean;
}

export const navItems: NavItemConfig[] = [
    { to: "/tickets", icon: Ticket, label: "Tickets" },
    { to: "/tickets/new", icon: PlusCircle, label: "New Ticket" },
    { to: "/users", icon: Users, label: "Users", roles: ["admin"], hideOnMobile: true },
    { to: "/offices", icon: Building2, label: "Offices", roles: ["admin"], hideOnMobile: true },
    { to: "/settings", icon: Settings, label: "Settings" },
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
