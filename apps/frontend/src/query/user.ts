import { useQuery } from '@tanstack/vue-query';

import { apiClient } from '../api/client.ts';

export function getUserQueryKey(userId: number) {
  return ['users', userId];
}
export function useUserQuery(userId: number) {
  return useQuery(getUserQueryKey(userId), async () => {
    const resp = await apiClient.get(`/users/${userId}`);
    return resp.data;
  });
}
