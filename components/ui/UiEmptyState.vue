<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    message?: string
    actionLabel?: string
  }>(),
  { message: '', actionLabel: '' }
)

const emit = defineEmits<{ action: [] }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-12 w-12 text-gray-300" aria-hidden="true">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z"
      />
    </svg>
    <p class="text-base font-medium text-gray-800">{{ title }}</p>
    <p v-if="message" class="text-sm text-gray-500">{{ message }}</p>
    <button
      v-if="actionLabel"
      type="button"
      class="mt-1 rounded-pill border border-gray-300 px-4 py-1.5 text-sm text-gray-800"
      @click="emit('action')"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>
