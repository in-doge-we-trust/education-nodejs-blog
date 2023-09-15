<script setup lang="ts">
  import dayjs from 'dayjs';

  import { useUserQuery } from '../../../query/user.ts';
  import BaseCard from '../../../components/BaseCard.vue';
  import { Post } from '../../../types/post.ts';

  const { post } = defineProps<{
    post: Post;
  }>();

  const { data: author } = useUserQuery(post.authorId);

  const postedAt = dayjs(post.createdAt);
  const postedAtPretty = postedAt.format('ddd, MMM DD, YYYY [at] HH:MM');
  const postedAgo = postedAt.fromNow();

  const POST_PREVIEW_TEXT_LENGTH = 256;
  const contentPreview = post.content.substring(0, POST_PREVIEW_TEXT_LENGTH);
  const isContentTruncated = post.content.length > POST_PREVIEW_TEXT_LENGTH;
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
            :to="{ name: 'user', params: { userId: author.id } }"
            class="text-cyan-700 font-semibold"
          >
            {{ author.nickname }}
          </router-link>
        </template>
      </p>
    </template>

    <p>
      {{ contentPreview }}{{ isContentTruncated ? '...' : '' }}
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
