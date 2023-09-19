<script setup lang="ts">
  import { computed } from 'vue';

  type HeaderVariant = 'header1' | 'header2' | 'header3';
  const headerVariantToTagMap: Record<HeaderVariant, string> = {
    header1: 'h1',
    header2: 'h2',
    header3: 'h3',
  } as const;
  type HeaderKind = 'default' | 'semibold' | 'bold';

  type BodyVariant = 'body1' | 'body2' | 'body3';
  const bodyVariantToTagMap: Record<BodyVariant, string> = {
    body1: 'p',
    body2: 'p',
    body3: 'p',
  } as const;
  type BodyKind = 'default' | 'medium' | 'semibold';

  type LabelVariant = 'label';
  const labelVariantToTagMap: Record<LabelVariant, string> = {
    label: 'span',
  };

  const variantToTagMap = {
    ...headerVariantToTagMap,
    ...bodyVariantToTagMap,
    ...labelVariantToTagMap,
  };

  type Color = 'primary' | 'secondary' | 'accent' | 'highlight';

  type VariantKindProps =
    | {
        variant: HeaderVariant;
        kind?: HeaderKind;
      }
    | {
        variant: BodyVariant;
        kind?: BodyKind;
      }
    | {
        variant: 'label';
        kind?: undefined;
      };
  const props = withDefaults(
    defineProps<VariantKindProps & { tag?: string; color?: Color }>(),
    {
      kind: 'default',
      tag: undefined,
      color: 'primary',
    },
  );

  const tag = computed(() => props.tag ?? variantToTagMap[props.variant]);
</script>

<template>
  <component
    :is="tag"
    :class="{
      [variant]: true,
      [`font-${kind}`]: kind !== 'default',
      [`color-${color}`]: true,
    }"
  >
    <slot></slot>
  </component>
</template>

<style scoped>
  .header1 {
    @apply text-3xl font-semibold;
  }

  .header2 {
    @apply text-2xl font-semibold;
  }

  .header3 {
    @apply text-xl font-semibold;
  }

  .body1 {
    @apply font-normal;
  }

  .body2,
  .label {
    @apply text-sm font-normal;
  }

  .body3 {
    @apply text-xs font-normal;
  }

  .color-primary {
    @apply text-neutral-600;
  }

  .color-secondary {
    @apply text-neutral-500;
  }

  .color-accent {
    @apply text-pink-500;
  }

  .color-highlight {
    @apply text-cyan-700;
  }
</style>
