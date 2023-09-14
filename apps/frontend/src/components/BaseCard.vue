<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      tag: string;
    }>(),
    {
      tag: 'section',
    },
  );
</script>

<template>
  <component :is="props.tag" class="bg-white rounded-md shadow-md">
    <header v-if="$slots.header" class="p-4 border-b border-b-neutral-200">
      <slot name="header"></slot>
    </header>

    <div class="p-4">
      <slot></slot>
    </div>

    <footer v-if="$slots.footer" class="p-4 border-t border-t-neutral-200">
      <slot name="footer"></slot>
    </footer>
  </component>
</template>

<style scoped></style>
