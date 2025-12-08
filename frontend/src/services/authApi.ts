import { api } from './api';
import { User } from './userService';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<{ user: User | null }, void>({
      query: () => ({ url: '/auth/me' }),
    }),
    login: build.mutation<{ user: User }, { email: string; password: string }>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi;
