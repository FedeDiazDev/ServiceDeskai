import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL || '/';

const rawBaseQuery = fetchBaseQuery({ baseUrl, credentials: 'include' });

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await rawBaseQuery(args, api, extraOptions);


  if (result.error) {
    const errAny = result.error as any;
    if (errAny.status === 'PARSING_ERROR' && errAny.originalStatus === 200) {
      const text = errAny.data;
      return { data: text } as any;
    }

    const status = errAny.status;
    const data = errAny.data as any;
    let friendly = data?.message || data?.error || (typeof data === 'string' ? data : JSON.stringify(data || '')) || 'Unknown error';
    if (status === 500) friendly = 'Error interno del servidor';
    if (status === 404) friendly = 'Recurso no encontrado';
    if (status === 401 || status === 403) friendly = 'No autorizado — por favor inicie sesión';
    result.error = { ...errAny, friendlyMessage: friendly } as any;
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Tickets', 'Users', 'Offices'],
  endpoints: () => ({}),
});
