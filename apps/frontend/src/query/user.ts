import { MaybeRef, unref } from 'vue';
import { useQuery, UseQueryOptions } from '@tanstack/vue-query';

import { apiClient } from '../api/client.ts';

export function getUserQueryKey(userId: number) {
  return ['users', userId];
}
export function useUserQuery(userId: MaybeRef<number>, options?: UseQueryOptions) {
  return useQuery({
    queryKey: getUserQueryKey(unref(userId)),
    queryFn: async () => {
      const resp = await apiClient.get(`/users/${unref(userId)}`);
      return resp.data;
    },
    ...options,
  });
}
