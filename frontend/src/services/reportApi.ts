import { api } from './api';

export const reportApi = api.injectEndpoints({
  endpoints: (build) => ({
    sendReportEmail: build.mutation<{ message: string }, { ticketId: string; to: string }>({
      query: (body) => ({
        url: '/reports/email',
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useSendReportEmailMutation } = reportApi;
