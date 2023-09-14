<script setup lang="ts">
  import dayjs from 'dayjs';

  import { useUserQuery } from '../../../query/user.ts';
  import BaseCard from '../../../components/BaseCard.vue';

  const { post } = defineProps<{
    post: {
      id: number;
      title: string;
      content: string;
      authorId: number;
      createdAt: string;
    };
  }>();

  const { data: author } = useUserQuery(post.authorId);

  const postedAt = dayjs(post.createdAt);
  const postedAtPretty = postedAt.format('ddd, MMM DD, YYYY [at] HH:MM');
  const postedAgo = postedAt.fromNow();

  const contentPreview = post.content.substring(0, 120);
  const isContentTruncated = post.content.length > 120;
</script>

<template>
  <base-card tag="article">
    <template #header>
      <h2 class="mb-1 text-2xl font-medium">
        <router-link
          :to="{ name: 'post', params: { postId: post.id } }"
          class="hover:text-cyan-700 transition-colors duration-300"
        >
          {{ post.title }}
        </router-link>
      </h2>

      <p class="text-sm text-neutral-500 italic">
        Posted
        <span :title="postedAtPretty" class="font-semibold cursor-help">
          {{ postedAgo }}
        </span>

        <template v-if="author?.nickname">
          by
          <router-link
            :to="{ name: 'user', params: { userId: author?.id } }"
            class="text-cyan-700 font-semibold"
          >
            {{ author?.nickname }}
          </router-link>
        </template>
      </p>
    </template>

    <p>
      {{ contentPreview }}
      <router-link
        v-if="isContentTruncated"
        :to="{ name: 'post', params: { postId: post.id } }"
        class="text-cyan-700 underline"
      >
        Read more
      </router-link>
    </p>
  </base-card>
</template>

<style scoped></style>
