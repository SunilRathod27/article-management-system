<script setup lang="ts">
import type { ViewMode } from '../../types'

withDefaults(
  defineProps<{
    variant?: ViewMode
  }>(),
  { variant: 'list' }
)
</script>

<template>
  <div
    class="flex animate-pulse items-center justify-center overflow-hidden rounded-lg bg-placeholder shadow-card"
    :class="variant === 'grid' ? 'h-40' : 'h-56'"
    aria-hidden="true"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-8 w-8 text-gray-300">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z"
      />
    </svg>
  </div>
</template>
