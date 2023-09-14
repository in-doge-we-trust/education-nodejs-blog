<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import dayjs from 'dayjs';

  import { usePostQuery } from '../../query/post.ts';
  import { useUserQuery } from '../../query/user.ts';

  const { params: routeParams } = useRoute();

  const postId = computed(() => Number(routeParams.postId));
  const { data: post, isLoading: isPostLoading } = usePostQuery(postId);

  const authorId = computed(() => post.value?.authorId ?? '');
  const shouldFetchAuthor = computed(() => !!authorId.value);
  const { data: author } = useUserQuery(authorId, {
    enabled: shouldFetchAuthor,
  });
</script>

<template>
  <main class="p-6">
    <p v-if="isPostLoading || !post">Loading the post...</p>

    <article v-else>
      <header class="mb-4">
        <h1 class="text-3xl text-cyan-700 mb-1">{{ post.title }}</h1>
        <p class="text-sm text-neutral-500 mb-1">
          {{ dayjs(post.createdAt).format('MMM D, YYYY [at] hh:mm a') }}
        </p>

        <p v-if="!!author">Posted by {{ author.nickname }}</p>
      </header>

      <p>{{ post.content }}</p>
    </article>
  </main>
</template>

<style scoped></style>
