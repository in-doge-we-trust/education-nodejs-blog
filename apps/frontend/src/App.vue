<script setup lang="ts">
  import { usePostsQuery } from './query/post.ts';

  const { data: posts, isLoading: arePostsLoading } = usePostsQuery();
</script>

<template>
  <main>
    <h1>All posts</h1>

    <div v-if="arePostsLoading">
      <p>Loading posts...</p>
    </div>
    <div v-else>
      <article v-for="post in posts" :key="post.id">
        <h2>
          {{ post.title }}
        </h2>

        <div>
          {{ post.content }}
        </div>
      </article>
    </div>
  </main>
</template>
