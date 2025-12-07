import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketCard from "../components/tickets/TicketCard";
import { Ticket } from "../types/ticket";
import { ticketService } from "../services/ticketService";

export default function Tickets() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await ticketService.getAll();
                setTickets(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Error al cargar los tickets');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTickets();
    }, []);

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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main mb-6">
                Tickets
            </h1>
            
            {tickets.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-dark-text-muted">No hay tickets</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {tickets.map((ticket) => (
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
