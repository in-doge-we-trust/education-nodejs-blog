import { Ref } from 'vue';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/vue-query';

import { apiClient } from '../api/client.ts';

function getPostsQueryKey() {
  return ['posts'];
}
export function usePostsQuery() {
  return useQuery(getPostsQueryKey(), async () => {
    const resp = await apiClient.get('/posts');
    return resp.data;
  });
}

function getPostQueryKey(postId: number) {
  return ['posts', postId];
}
export function usePostQuery(postId: Ref<number>, options?: UseQueryOptions) {
  return useQuery({
    queryKey: getPostQueryKey(postId.value),
    queryFn: async () => {
      const resp = await apiClient.get(`/posts/${postId.value}`);
      return resp.data;
    },
    ...options,
  });
}

export function usePostCreateMutation() {
  return useMutation((variables: unknown) => apiClient.post('/posts', variables));
}

export function usePostUpdateMutation() {
  return useMutation(({ postId, ...restData }: { postId: number }) =>
    apiClient.patch(`/posts/${postId}`, restData),
  );
}

export function usePostDeleteMutation() {
  return useMutation(({ postId }: { postId: number }) =>
    apiClient.delete(`/posts/${postId}`),
  );
}
