import { Building2, MapPin, Calendar } from 'lucide-react';

interface OfficeCardProps {
    _id: string;
    name: string;
    location: string;
    createdAt: string;
    onClick?: () => void;
}

export default function OfficeCard({ name, location, createdAt, onClick }: OfficeCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div 
            className="flex flex-col gap-3 p-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-dark-border cursor-pointer w-full shadow-sm"
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-dark-text-main">
                    {name}
                </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-dark-text-muted">
                <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{location || 'No location'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(createdAt)}</span>
                </div>
            </div>
        </div>
    );
}
