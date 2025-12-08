import { api } from './api';
import { Ticket } from '../types/ticket';

export const ticketsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTickets: build.query<Ticket[], { status?: string; priority?: string } | void>({
      query: (params?: { status?: string; priority?: string }) => ({ url: '/tickets', params }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((t) => ({ type: 'Tickets' as const, id: t._id })),
              { type: 'Tickets', id: 'LIST' },
            ]
          : [{ type: 'Tickets', id: 'LIST' }],
    }),
    getTicketById: build.query<Ticket, string>({
      query: (id) => `/tickets/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tickets', id }],
    }),
    updateStatus: build.mutation<Ticket, { id: string; status: string }>({
      query: ({ id, status }) => ({ url: `/tickets/${id}/status`, method: 'PATCH', body: { status } }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tickets', id }, { type: 'Tickets', id: 'LIST' }],
    }),
    createTicket: build.mutation<Ticket, Partial<{ title: string; description: string; priority: string; tags: string[]; attachments: string[]; office?: string; workstation?: string; geolocation?: any }>>({
      query: (body) => ({ url: '/tickets/create', method: 'POST', body }),
      invalidatesTags: [{ type: 'Tickets', id: 'LIST' }],
    }),
    assignTicket: build.mutation<Ticket, { id: string; userId: string }>({
      query: ({ id, userId }) => ({ url: `/tickets/${id}/assign`, method: 'PATCH', body: { userId } }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tickets', id }, { type: 'Tickets', id: 'LIST' }],
    }),
    updateTicket: build.mutation<Ticket, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/tickets/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tickets', id }, { type: 'Tickets', id: 'LIST' }],
    }),
    deleteTicket: build.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/tickets/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [{ type: 'Tickets', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useUpdateStatusMutation,
  useCreateTicketMutation,
  useAssignTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketsApi;
