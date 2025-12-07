import { User as UserIcon, Mail, Building2, Calendar } from 'lucide-react';

type UserRole = 'user' | 'service' | 'admin';

interface UserCardProps {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    office?: {
        _id: string;
        name: string;
    };
    createdAt: string;
    onClick?: () => void;
}

const roleColors: Record<UserRole, string> = {
    admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    service: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    user: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const roleLabels: Record<UserRole, string> = {
    admin: 'Administrador',
    service: 'Service Desk',
    user: 'Usuario',
};

export default function UserCard({ name, email, role, office, createdAt, onClick }: UserCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div 
            className="flex flex-col gap-3 p-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-dark-border cursor-pointer w-full shadow-sm"
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-dark-text-main">
                            {name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-dark-text-muted">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{email}</span>
                        </div>
                    </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[role]}`}>
                    {roleLabels[role]}
                </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-dark-text-muted">
                <div className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{office?.name || 'Sin oficina'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(createdAt)}</span>
                </div>
            </div>
        </div>
    );
}
