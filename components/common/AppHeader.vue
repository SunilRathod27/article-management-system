<script setup lang="ts">
import type { ViewMode } from '../../types'

defineProps<{
  viewMode: ViewMode
}>()

const emit = defineEmits<{ 'update:viewMode': [mode: ViewMode] }>()
</script>

<template>
  <header class="flex items-center justify-between border-b border-gray-100 px-4 py-4 shadow-header">
    <h1 class="text-xl font-bold text-black">Articles</h1>
    <div class="flex items-center gap-4">
      <button
        type="button"
        :aria-pressed="viewMode === 'grid'"
        aria-label="Toggle grid or list view"
        class="flex h-6 w-6 items-center justify-center text-black"
        @click="emit('update:viewMode', viewMode === 'list' ? 'grid' : 'list')"
      >
        <svg v-if="viewMode === 'list'" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5" aria-hidden="true">
          <path
            d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm8 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM3 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm8 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
          />
        </svg>
        <svg v-else viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" class="h-5 w-5 text-black" aria-hidden="true">
        <circle cx="9" cy="9" r="6" stroke-width="1.5" />
        <path stroke-linecap="round" stroke-width="1.5" d="M14 14l3 3" />
      </svg>
    </div>
  </header>
</template>
