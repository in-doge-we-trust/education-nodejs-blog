<script setup lang="ts">
  import dayjs from 'dayjs';
  import { useUserQuery } from '../query/user.ts';

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
  <article
    :key="post.id"
    class="flex flex-col gap-2 p-4 border border-neutral-100 rounded-sm shadow-md"
  >
    <h2 class="text-2xl">
      {{ post.title }}
    </h2>

    <p class="text-sm text-neutral-500 italic">
      Posted <span class="font-semibold" :title="postedAtPretty">{{ postedAgo }}</span>

      <template v-if="author?.nickname">
        by <span class="font-semibold">{{ author.nickname }}</span>
      </template>
    </p>

    <p>
      {{ contentPreview }}
      <a v-if="isContentTruncated" href="#" class="text-cyan-700 underline">Read more</a>
    </p>
  </article>
</template>

<style scoped></style>
