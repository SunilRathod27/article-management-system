<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
    fullPage?: boolean
  }>(),
  { message: 'Please connect to the internet and try again.', fullPage: false }
)

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div
    role="alert"
    class="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center"
    :class="fullPage ? 'min-h-screen w-full bg-[#DAD9D9]' : 'bg-placeholder'"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-12 w-12 text-gray-400" aria-hidden="true">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M3 3l18 18M8.5 16.5a5 5 0 016.6-.3M5.5 13a9 9 0 0113-6.8M2 9.8a13 13 0 013.8-2.6M12 20h.01"
      />
    </svg>
    <p class="text-base font-medium text-gray-800">You're offline</p>
    <p class="text-sm text-gray-500">{{ message }}</p>
    <button
      type="button"
      class="mt-1 rounded-pill border border-gray-300 px-4 py-1.5 text-sm text-gray-800"
      @click="emit('retry')"
    >
      Retry
    </button>
  </div>
</template>
