<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string | null
    alt?: string
    aspect?: 'card' | 'grid' | 'hero'
  }>(),
  { alt: '', aspect: 'card' }
)

const heightClass = computed(() => {
  switch (props.aspect) {
    case 'grid':
      return 'h-28'
    case 'hero':
      return 'h-64 md:h-80'
    default:
      return 'h-40'
  }
})

const hasLoadError = ref(false)
watch(
  () => props.src,
  () => {
    hasLoadError.value = false
  }
)

const showImage = computed(() => Boolean(props.src) && !hasLoadError.value)
</script>

<template>
  <div class="flex w-full items-center justify-center overflow-hidden bg-placeholder" :class="heightClass">
    <img
      v-if="showImage"
      :src="src as string"
      :alt="alt"
      class="h-full w-full object-cover"
      loading="lazy"
      @error="hasLoadError = true"
    >
    <svg
      v-else
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      class="h-8 w-8 text-gray-300"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z"
      />
    </svg>
  </div>
</template>
