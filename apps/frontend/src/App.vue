<script setup lang="ts">
  import { usePostsQuery } from './query/post.ts';

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
      <article
        v-for="post in posts"
        :key="post.id"
        class="flex flex-col gap-2 p-4 border border-neutral-100 shadow-md"
      >
        <h2 class="text-2xl">
          {{ post.title }}
        </h2>

        <p>
          {{ post.content }}
        </p>
      </article>
    </div>
  </main>
</template>
