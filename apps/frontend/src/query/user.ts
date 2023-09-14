import { Ref } from 'vue';
import { useQuery, UseQueryOptions } from '@tanstack/vue-query';

import { apiClient } from '../api/client.ts';

export function getUserQueryKey(userId: number) {
  return ['users', userId];
}
export function useUserQuery(userId: Ref<number>, options?: UseQueryOptions) {
  return useQuery({
    queryKey: getUserQueryKey(userId.value),
    queryFn: async () => {
      const resp = await apiClient.get(`/users/${userId.value}`);
      return resp.data;
    },
    ...options,
  });
}
