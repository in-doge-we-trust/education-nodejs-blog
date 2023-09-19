<script setup lang="ts">
  import type { InputHTMLAttributes } from 'vue';

  interface Props extends /* @vue-ignore */ InputHTMLAttributes {}

  withDefaults(defineProps<Props>(), {});
</script>

<template>
  <input
    :id="id"
    class="w-full px-3 py-2 border border-neutral-400 rounded-md outline-none focus:ring-2 focus:ring-pink-300"
  />
</template>
