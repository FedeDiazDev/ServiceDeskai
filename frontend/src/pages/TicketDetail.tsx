import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketDetailCard from '../components/tickets/TicketDetailCard';
import { useGetTicketByIdQuery, useUpdateStatusMutation } from '../services/ticketsApi';
import { Mail, Send, Play, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useSendReportEmailMutation } from '../services/reportApi';
import { TicketStatus } from '../types/ticket';
import { useAuth } from '../context/AuthContext';

export default function TicketDetail() {
    const { id } = useParams();
    const { hasRole } = useAuth();

    const { data: ticket, isLoading, isError } = useGetTicketByIdQuery(id as string);
    const [updateStatus, { isLoading: actionLoading }] = useUpdateStatusMutation();

    const canManage = hasRole(['service', 'admin']);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [emailTo, setEmailTo] = useState("");
    const [sendReportEmail, { isLoading: sending, isSuccess, isError: isSendError, error }] = useSendReportEmailMutation();
    const handleSendEmail = async () => {
        if (!id || !emailTo) return;
        await sendReportEmail({ ticketId: id, to: emailTo });
    };

    const handleStatusChange = async (newStatus: TicketStatus) => {
        if (!ticket || !id) return;
        try {
            await updateStatus({ id: id as string, status: newStatus }).unwrap();
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-8">
                <p className="text-status-high-text">Error loading ticket</p>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">Ticket not found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main">Ticket Details</h1>
            </div>

            <div className="flex flex-col gap-4">
                <TicketDetailCard {...ticket} />

                <div className="flex items-center gap-2">
                    <button
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-primary-600 text-white shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 transition"
                        onClick={() => setShowEmailInput((v) => !v)}
                    >
                        <Mail className="h-4 w-4" />
                        Share by email
                    </button>
                    {showEmailInput && (
                        <div className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="Recipient email"
                                value={emailTo}
                                onChange={e => setEmailTo(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary-400 focus:border-primary-400 transition w-56"
                                disabled={sending}
                            />
                            <button
                                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-green-600 text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                onClick={handleSendEmail}
                                disabled={sending || !emailTo}
                            >
                                <Send className="h-4 w-4" />
                                Send
                            </button>
                        </div>
                    )}
                    {isSuccess && <span className="text-sm text-green-600">Email sent successfully</span>}
                    {isError && <span className="text-sm text-red-600">{(error as any)?.data?.message || 'Error sending email'}</span>}
                </div>

                {canManage && (
                    <div className="flex items-center gap-3 flex-wrap">
                        {ticket.status !== 'in_progress' && ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                            <button
                                disabled={actionLoading}
                                onClick={() => handleStatusChange('in_progress')}
                                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {actionLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Play className="h-4 w-4" />
                                )}
                                Start Progress
                            </button>
                        )}

                        {ticket.status === 'in_progress' && (
                            <button
                                disabled={actionLoading}
                                onClick={() => handleStatusChange('resolved')}
                                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-emerald-600 text-white shadow-md hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {actionLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <CheckCircle className="h-4 w-4" />
                                )}
                                Mark Resolved
                            </button>
                        )}

                        {ticket.status === 'resolved' && (
                            <button
                                disabled={actionLoading}
                                onClick={() => handleStatusChange('closed')}
                                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-rose-600 text-white shadow-md hover:bg-rose-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {actionLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <XCircle className="h-4 w-4" />
                                )}
                                Close Ticket
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
