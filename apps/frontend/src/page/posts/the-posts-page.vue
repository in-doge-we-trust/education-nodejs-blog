<script setup lang="ts">
  import { usePostsQuery } from '../../query/post.ts';
  import BaseButton from '../../components/BaseButton.vue';

  import PostPreview from './components/post-preview.vue';

  const { data: posts, isLoading: arePostsLoading } = usePostsQuery();
</script>

<template>
  <header class="flex flex-row justify-between items-center p-6 pb-3">
    <h1 class="text-3xl text-cyan-700">All posts</h1>

    <base-button variant="primary" @click="$router.push({ name: 'posts-add' })">
      + New post
    </base-button>
  </header>
  <main class="p-6 pt-3">
    <div v-if="arePostsLoading">
      <p>Loading posts...</p>
    </div>
    <section v-else class="flex flex-col gap-4">
      <post-preview v-for="post in posts" :key="post.id" :post="post" />
    </section>
  </main>
</template>

<style scoped></style>
