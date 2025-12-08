import { api } from './api';
import { User } from './userService';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => ({ url: '/users' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((u) => ({ type: 'Users' as const, id: u._id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    createUser: build.mutation<User, Partial<User>>({
      query: (body) => ({ url: '/users', method: 'POST', body }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: build.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({ url: `/users/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }, { type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation, useCreateUserMutation, useUpdateUserMutation } = usersApi;
