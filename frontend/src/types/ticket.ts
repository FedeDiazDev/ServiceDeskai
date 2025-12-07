export type TicketStatus = 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TicketUser {
    _id: string;
    name: string;
    surname: string;
}

export interface TicketOffice {
    _id: string;
    name: string;
    location: string;
}

export interface Geolocation {
    latitude: number;
    longitude: number;
    accuracy?: number;
    address?: string;
}

export interface Ticket {
    _id: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    createdAt: string;
    createdBy: TicketUser;
    assignedTo?: TicketUser;
    office?: TicketOffice;
    workstation?: string;
    tags?: string[];
    attachments?: string[];
    geolocation?: Geolocation;
}


export const statusLabels: Record<TicketStatus, string> = {
    open: 'Open',
    assigned: 'Assigned',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
};

export const priorityLabels: Record<TicketPriority, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
};

export const statusStyles: Record<TicketStatus, string> = {
    open: 'bg-status-open-bg text-status-open-text border-status-open-border dark:bg-status-open-bg/20 dark:text-status-open-dark',
    assigned: 'bg-status-assigned-bg text-status-assigned-text border-status-assigned-border dark:bg-status-assigned-bg/20 dark:text-status-assigned-dark',
    in_progress: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400',
    resolved: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400',
    closed: 'bg-status-closed-bg text-status-closed-text border-status-closed-border dark:bg-status-closed-bg/20 dark:text-status-closed-dark',
};

export const priorityStyles: Record<TicketPriority, string> = {
    low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    medium: 'bg-status-open-bg text-status-open-text dark:bg-status-open-bg/20 dark:text-status-open-dark',
    high: 'bg-status-high-bg text-status-high-text dark:bg-status-high-bg/20 dark:text-rose-400',
    urgent: 'bg-red-600 text-white dark:bg-red-700 dark:text-white',
};
