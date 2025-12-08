import { Building2, MapPin, Calendar, User } from 'lucide-react';
import { Ticket } from '../../types/ticket';
import { statusLabels, statusStyles, priorityLabels, priorityStyles } from '../../types/ticket';

interface Props extends Ticket {
    onAction?: (action: string) => void;
}

export default function TicketDetailCard(props: Props) {
    const { title, description, status, priority, createdAt, createdBy, assignedTo, office, workstation, geolocation, attachments } = props;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div className="p-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text-main">{title}</h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityStyles[priority]}`}>{priorityLabels[priority]}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>{statusLabels[status]}</span>
            </div>

            <p className="text-sm text-gray-600 dark:text-dark-text-muted mb-4">{description}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-dark-text-muted mb-4">
                {office && (
                    <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>{office.name}{workstation ? ` - ${workstation}` : ''}</span>
                    </div>
                )}

                {geolocation && (
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <a
                            className="underline text-primary-600"
                            href={`https://www.google.com/maps/search/?api=1&query=${geolocation.latitude},${geolocation.longitude}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {geolocation.address || `${geolocation.latitude.toFixed(4)}, ${geolocation.longitude.toFixed(4)}`}
                        </a>
                    </div>
                )}

                <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{assignedTo ? `${assignedTo.name} ${assignedTo.surname}` : `${createdBy.name} ${createdBy.surname}`}</span>
                </div>

                <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(createdAt)}</span>
                </div>
            </div>

            {attachments && attachments.length > 0 && (
                <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-800 dark:text-dark-text-main mb-2">Adjuntos</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {attachments.map((att, idx) => (
                                <div key={idx} className="border rounded overflow-hidden bg-gray-50">
                                        {att.startsWith('data:image') ? (
                                            <img src={att} alt={`adjunto-${idx}`} className="w-full h-56 sm:h-64 object-cover rounded-md" />
                                        ) : (
                                            <a href={att} target="_blank" rel="noreferrer" className="block p-2 text-sm text-primary-600">Ver adjunto</a>
                                        )}
                                    </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
