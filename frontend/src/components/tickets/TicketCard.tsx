import { statusLabels, statusStyles, priorityLabels, priorityStyles } from '../../types/ticket';
import { Building2, Calendar, User } from 'lucide-react';

interface TicketCardProps {
    _id: string;
    title: string;
    description: string;
    status: 'open' | 'assigned' | 'closed';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    createdBy: {
        name: string;
        surname: string;
    };
    assignedTo?: {
        name: string;
        surname: string;
    };
    office?: {
        id: string;
        name: string;
    };
    onClick?: () => void;
}

export default function TicketCard({ _id, title, description, status, priority, createdAt, createdBy, assignedTo, office, onClick }: TicketCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div 
            className="flex flex-col gap-3 p-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-dark-border cursor-pointer w-full shadow-sm"
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityStyles[priority]}`}>
                    {priorityLabels[priority]}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
                    {statusLabels[status]}
                </span>
            </div>

            <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-dark-text-main line-clamp-1">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-muted line-clamp-2 mt-1">
                    {description}
                </p>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-dark-text-muted">
                {office && (
                    <div className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{office.name}</span>
                    </div>
                )}
                <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>
                        {assignedTo 
                            ? `${assignedTo.name} ${assignedTo.surname}`
                            : 'Unassigned'
                        }
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(createdAt)}</span>
                </div>
            </div>
        </div>
    );
}