<script setup lang="ts">
  import { usePostsQuery } from '../../query/post.ts';

  import PostPreview from './components/post-preview.vue';

  const { data: posts, isLoading: arePostsLoading } = usePostsQuery();
</script>

<template>
  <main class="p-6">
    <h1 class="text-3xl text-cyan-700 mb-6">All posts</h1>

    <div v-if="arePostsLoading">
      <p>Loading posts...</p>
    </div>
    <section v-else class="flex flex-col gap-4">
      <post-preview v-for="post in posts" :key="post.id" :post="post" />
    </section>
  </main>
</template>

<style scoped></style>
