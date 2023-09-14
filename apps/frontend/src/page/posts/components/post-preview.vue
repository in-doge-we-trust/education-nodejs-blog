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
  <base-card>
    <header class="mb-2">
      <h2 class="mb-1 text-2xl hover:text-cyan-700 transition-colors duration-300">
        <router-link :to="{ name: 'post', params: { postId: post.id } }">
          {{ post.title }}
        </router-link>
      </h2>

      <p class="text-xs text-neutral-500 italic">
        Posted
        <strong class="font-semibold text-neutral-500" :title="postedAtPretty">
          {{ postedAgo }}
        </strong>

        <template v-if="author?.nickname">
          by
          <strong class="font-semibold text-neutral-500">{{ author.nickname }}</strong>
        </template>
      </p>
    </header>

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
