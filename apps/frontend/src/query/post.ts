import { useMutation, useQuery } from '@tanstack/vue-query';

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
export function usePostQuery(postId: number) {
  return useQuery(getPostQueryKey(postId), async () => {
    const resp = await apiClient.get(`/posts/${postId}`);
    return resp.data;
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
