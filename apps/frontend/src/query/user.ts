import { MaybeRef, unref } from 'vue';
import { useQuery, UseQueryOptions, UseQueryReturnType } from '@tanstack/vue-query';

import { apiClient } from '../api/client.ts';
import { UserReadResponse, UsersReadResponse } from '../types/api/user.ts';

function getUsersQueryKey() {
  return ['users'] as const;
}
export function useUsersQuery(): UseQueryReturnType<UsersReadResponse, unknown> {
  return useQuery({
    queryKey: getUsersQueryKey(),
    queryFn: async () => {
      const resp = await apiClient.get('/users');
      return resp.data;
    },
  });
}

export function getUserQueryKey(userId: number) {
  return ['users', userId] as const;
}
export function useUserQuery(
  userId: MaybeRef<number>,
  options?: UseQueryOptions<UserReadResponse>,
): UseQueryReturnType<UserReadResponse, unknown> {
  return useQuery({
    queryKey: getUserQueryKey(unref(userId)),
    queryFn: async () => {
      const resp = await apiClient.get(`/users/${unref(userId)}`);
      return resp.data;
    },
    ...options,
  });
}
