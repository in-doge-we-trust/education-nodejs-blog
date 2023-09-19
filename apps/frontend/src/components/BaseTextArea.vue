<script setup lang="ts">
  import type { TextareaHTMLAttributes } from 'vue';

  interface Props extends /* @vue-ignore */ TextareaHTMLAttributes {
    resize?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    resize: false,
  });
</script>

<template>
  <textarea
    class="w-full px-3 py-2 border border-neutral-400 rounded-md outline-none focus:ring-2 focus:ring-pink-300"
    :class="{ 'no-resize': !resize }"
  ></textarea>
</template>

<style scoped>
  .no-resize {
    resize: none;
  }
</style>
