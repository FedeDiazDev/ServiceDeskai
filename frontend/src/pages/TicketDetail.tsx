import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TicketDetailCard from '../components/tickets/TicketDetailCard';
import { ticketService } from '../services/ticketService';
import { Ticket, TicketStatus } from '../types/ticket';
import { useAuth } from '../context/AuthContext';

export default function TicketDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, hasRole } = useAuth();

    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        const fetch = async () => {
            try {
                const data = await ticketService.getById(id);
                setTicket(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Error al cargar ticket');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    const canManage = hasRole(['service', 'admin']);

    const handleStatusChange = async (newStatus: TicketStatus) => {
        if (!ticket || !id) return;
        setActionLoading(true);
        try {
            const updated = await ticketService.patchStatus(id, newStatus);
            setTicket(updated);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Error al actualizar estado');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-status-high-text">{error}</p>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">Ticket no encontrado</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main">Detalle del ticket</h1>
            </div>

            <div className="flex flex-col gap-4">
                <TicketDetailCard {...ticket} />

                {canManage && (
                    <div className="flex items-center gap-2">
                        {ticket.status !== 'in_progress' && (
                            <button
                                disabled={actionLoading}
                                onClick={() => handleStatusChange('in_progress')}
                                className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                            >
                                Marcar en progreso
                            </button>
                        )}

                        {ticket.status === 'in_progress' && (
                            <button
                                disabled={actionLoading}
                                onClick={() => handleStatusChange('resolved')}
                                className="px-3 py-2 bg-green-600 text-white rounded-md text-sm"
                            >
                                Marcar resuelto
                            </button>
                        )}

                        {ticket.status === 'resolved' && (
                            <button
                                disabled={actionLoading}
                                onClick={() => handleStatusChange('closed')}
                                className="px-3 py-2 bg-rose-600 text-white rounded-md text-sm"
                            >
                                Cerrar ticket
                            </button>
                        )}

                        {actionLoading && <span className="text-sm text-gray-500">Procesando...</span>}
                    </div>
                )}
            </div>
        </div>
    );
}
