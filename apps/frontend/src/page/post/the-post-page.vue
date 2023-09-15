<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import dayjs from 'dayjs';

  import { usePostQuery } from '../../query/post.ts';
  import { useUserQuery } from '../../query/user.ts';
  import BaseCard from '../../components/BaseCard.vue';

  const { params: routeParams } = useRoute();

  const postId = computed(() => Number(routeParams.postId));
  const { data: post, isLoading: isPostLoading } = usePostQuery(postId);

  const authorId = computed(() => post.value?.authorId ?? 0);
  const shouldFetchAuthor = computed(() => !!authorId.value);
  const { data: author } = useUserQuery(authorId, {
    enabled: shouldFetchAuthor,
  });
</script>

<template>
  <p v-if="isPostLoading || !post">Loading the post...</p>

  <main v-else class="p-6">
    <base-card tag="article">
      <template #header>
        <h1 class="text-3xl text-cyan-700 font-medium mb-1">{{ post.title }}</h1>
        <p class="text-sm text-neutral-500 mb-2">
          {{ dayjs(post.createdAt).format('MMM D, YYYY [at] hh:mm a') }}
        </p>

        <p v-if="!!author">
          Posted by
          <router-link
            :to="{ name: 'user', params: { userId: author.id } }"
            class="text-cyan-700 font-medium"
          >
            {{ author.nickname }}
          </router-link>
        </p>
      </template>

      <p>{{ post.content }}</p>
    </base-card>
  </main>
</template>

<style scoped></style>
