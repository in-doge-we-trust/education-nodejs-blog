<script setup lang="ts">
  import { usePostsQuery } from './query/post.ts';
  import ThePostPreview from './components/ThePostPreview.vue';

  const { data: posts, isLoading: arePostsLoading } = usePostsQuery();
</script>

<template>
  <header class="p-6 bg-cyan-700">
    <h1 class="text-3xl text-neutral-100">All posts</h1>
  </header>
  <main class="p-6">
    <div v-if="arePostsLoading">
      <p>Loading posts...</p>
    </div>
    <div v-else class="flex flex-col gap-4">
      <ThePostPreview v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </main>
</template>
