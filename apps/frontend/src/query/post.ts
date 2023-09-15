import { Ref, unref } from 'vue';
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryReturnType,
} from '@tanstack/vue-query';

import { apiClient } from '../api/client.ts';
import {
  PostsReadResponse,
  PostReadResponse,
  PostCreateRequest,
} from '../types/api/post.ts';

function getPostsQueryKey() {
  return ['posts'] as const;
}
export function usePostsQuery(): UseQueryReturnType<PostsReadResponse, unknown> {
  return useQuery(getPostsQueryKey(), async () => {
    const resp = await apiClient.get('/posts');
    return resp.data;
  });
}

function getPostQueryKey(postId: number) {
  return ['posts', postId] as const;
}
export function usePostQuery(
  postId: Ref<number>,
  options?: UseQueryOptions<PostReadResponse>,
): UseQueryReturnType<PostReadResponse, unknown> {
  return useQuery<PostReadResponse>({
    queryKey: getPostQueryKey(unref(postId)),
    queryFn: async () => {
      const resp = await apiClient.get(`/posts/${unref(postId)}`);
      return resp.data;
    },
    ...options,
  });
}

export function usePostCreateMutation() {
  return useMutation((variables: PostCreateRequest) =>
    apiClient.post('/posts', variables),
  );
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
