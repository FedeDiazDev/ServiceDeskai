import { api } from './api';
import { Office } from './officeService';

export const officesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOffices: build.query<Office[], void>({
      query: () => ({ url: '/offices' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((o) => ({ type: 'Offices' as const, id: o._id })),
              { type: 'Offices', id: 'LIST' },
            ]
          : [{ type: 'Offices', id: 'LIST' }],
    }),
    deleteOffice: build.mutation<void, string>({
      query: (id) => ({ url: `/offices/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Offices', id: 'LIST' }],
    }),
    createOffice: build.mutation<Office, Partial<Office>>({
      query: (body) => ({ url: '/offices', method: 'POST', body }),
      invalidatesTags: [{ type: 'Offices', id: 'LIST' }],
    }),
    updateOffice: build.mutation<Office, { id: string; data: Partial<Office> }>({
      query: ({ id, data }) => ({ url: `/offices/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Offices', id }, { type: 'Offices', id: 'LIST' }],
    }),
  }),
});

export const { useGetOfficesQuery, useDeleteOfficeMutation, useCreateOfficeMutation, useUpdateOfficeMutation } = officesApi;
