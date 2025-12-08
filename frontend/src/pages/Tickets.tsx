import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketCard from "../components/tickets/TicketCard";
import { Ticket, TicketStatus } from "../types/ticket";
import { useGetTicketsQuery } from '../services/ticketsApi';

const statusOptions: { label: string; value?: TicketStatus }[] = [
    { label: 'Todos', value: undefined },
    { label: 'Open', value: 'open' },
    { label: 'Assigned', value: 'assigned' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Resolved', value: 'resolved' },
    { label: 'Closed', value: 'closed' },
];

export default function Tickets() {
    const [statusFilter, setStatusFilter] = useState<TicketStatus | undefined>(undefined);
    const [priorityFilter, setPriorityFilter] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    const { data: tickets, isLoading, isError, refetch } = useGetTicketsQuery(
        { status: statusFilter as any, priority: priorityFilter },
        { refetchOnReconnect: true }
    );
    const error = isError ? 'Error al cargar los tickets' : null;

    if (isLoading) {
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

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main">Tickets</h1>
                <div className="text-sm text-gray-500">{tickets?.length ?? 0} resultados</div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                    {statusOptions.map((opt) => (
                        <button
                            key={opt.label}
                            onClick={() => setStatusFilter(opt.value)}
                            className={`px-3 py-1 rounded-full text-sm ${statusFilter === opt.value ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800'}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <select
                        value={priorityFilter || ''}
                        onChange={(e) => setPriorityFilter(e.target.value || undefined)}
                        className="px-3 py-1 border rounded text-sm bg-white dark:bg-dark-surface"
                    >
                        <option value="">Todas prioridades</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    { (statusFilter || priorityFilter) && (
                        <button onClick={() => { setStatusFilter(undefined); setPriorityFilter(undefined); }} className="text-sm text-gray-500 underline">Reset</button>
                    ) }
                </div>
            </div>

            {(!tickets || tickets.length === 0) ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-dark-text-muted">No hay tickets</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {tickets!.map((ticket) => (
                        <TicketCard
                            key={ticket._id}
                            {...ticket}
                            onClick={() => navigate(`/tickets/${ticket._id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
