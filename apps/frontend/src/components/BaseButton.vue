<script setup lang="ts">
  defineOptions({
    inheritAttrs: false,
  });

  withDefaults(
    defineProps<{
      type?: 'button' | 'submit';
      variant?: 'primary' | 'secondary';
      disabled?: boolean;
    }>(),
    {
      type: 'button',
      variant: 'primary',
      disabled: false,
    },
  );

  defineEmits<{
    (e: 'click'): void;
  }>();
</script>

<template>
  <button
    :type="type"
    :class="{
      button: true,
      primary: variant === 'primary',
      secondary: variant === 'secondary',
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
  .button {
    @apply px-4 py-2;
    @apply rounded-md;
    @apply font-semibold;
    @apply transition-colors duration-150;
    @apply cursor-pointer disabled:cursor-not-allowed;
    @apply outline-none;
  }

  .primary {
    @apply bg-pink-500 text-neutral-100;
    @apply border-2 border-pink-500;
    @apply active:bg-pink-600 active:border-pink-600;
    @apply disabled:bg-pink-300 disabled:border-pink-300;
    @apply focus:ring-4 focus:ring-pink-300;
  }

  .secondary {
    @apply bg-transparent text-pink-500;
    @apply border-2 border-pink-500;
    @apply active:bg-pink-100;
    @apply disabled:bg-transparent disabled:text-pink-300 disabled:border-pink-300;
  }
</style>
