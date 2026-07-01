<script setup lang="ts">
import { ref } from 'vue'
import type { ViewMode } from '../../types'

defineProps<{
  viewMode: ViewMode
  searchQuery: string
}>()

const emit = defineEmits<{
  'update:viewMode': [mode: ViewMode]
  'update:searchQuery': [query: string]
}>()

const isSearchOpen = ref(false)

function toggleSearch(): void {
  isSearchOpen.value = !isSearchOpen.value
  if (!isSearchOpen.value) {
    emit('update:searchQuery', '')
  }
}

function handleSearchInput(event: Event): void {
  emit('update:searchQuery', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <header class="border-b border-gray-100 px-4 py-4 shadow-header">
    <div class="flex items-center justify-between gap-4">
      <h1 v-if="!isSearchOpen" class="text-xl font-bold text-black">Articles</h1>
      <input
        v-else
        type="search"
        :value="searchQuery"
        placeholder="Search articles..."
        aria-label="Search articles"
        class="w-full rounded-pill border border-gray-200 px-4 py-1.5 text-sm text-gray-900 focus:border-brand-primary focus:outline-none"
        @input="handleSearchInput"
      >
      <div class="flex shrink-0 items-center gap-4">
        <button
          v-if="!isSearchOpen"
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
        <button
          type="button"
          :aria-label="isSearchOpen ? 'Close search' : 'Search articles'"
          class="flex h-5 w-5 items-center justify-center text-black"
          @click="toggleSearch"
        >
          <svg v-if="!isSearchOpen" viewBox="0 0 20 20" fill="none" stroke="currentColor" class="h-5 w-5" aria-hidden="true">
            <circle cx="9" cy="9" r="6" stroke-width="1.5" />
            <path stroke-linecap="round" stroke-width="1.5" d="M14 14l3 3" />
          </svg>
          <svg v-else viewBox="0 0 20 20" fill="none" stroke="currentColor" class="h-5 w-5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
