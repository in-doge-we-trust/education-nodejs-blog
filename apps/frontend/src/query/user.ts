import { MaybeRef, unref } from 'vue';
import { useQuery, UseQueryOptions } from '@tanstack/vue-query';

import { apiClient } from '../api/client.ts';

export function getUserQueryKey(userId: number) {
  return ['users', userId];
}
export function useUserQuery(userId: MaybeRef<number>, options?: UseQueryOptions) {
  const userIdValue = unref(userId);

  return useQuery({
    queryKey: getUserQueryKey(userIdValue),
    queryFn: async () => {
      const resp = await apiClient.get(`/users/${userIdValue}`);
      return resp.data;
    },
    ...options,
  });
}
