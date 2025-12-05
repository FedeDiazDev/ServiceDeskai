export type TicketStatus = 'open' | 'assigned' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface TicketUser {
    name: string;
    surname: string;
}

export interface TicketOffice {
    id: string;
    name: string;
}

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    createdAt: string;
    createdBy: TicketUser;
    assignedTo?: TicketUser;
    office?: TicketOffice;
}

// Labels para mostrar en español
export const statusLabels: Record<TicketStatus, string> = {
    open: 'Abierto',
    assigned: 'Asignado',
    closed: 'Cerrado',
};

export const priorityLabels: Record<TicketPriority, string> = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
};

// Clases de Tailwind para cada estado
export const statusStyles: Record<TicketStatus, string> = {
    open: 'bg-status-open-bg text-status-open-text border-status-open-border dark:bg-status-open-bg/20 dark:text-status-open-dark',
    assigned: 'bg-status-assigned-bg text-status-assigned-text border-status-assigned-border dark:bg-status-assigned-bg/20 dark:text-status-assigned-dark',
    closed: 'bg-status-closed-bg text-status-closed-text border-status-closed-border dark:bg-status-closed-bg/20 dark:text-status-closed-dark',
};

// Clases de Tailwind para cada prioridad
export const priorityStyles: Record<TicketPriority, string> = {
    low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    medium: 'bg-status-open-bg text-status-open-text dark:bg-status-open-bg/20 dark:text-status-open-dark',
    high: 'bg-status-high-bg text-status-high-text dark:bg-status-high-bg/20 dark:text-rose-400',
};
