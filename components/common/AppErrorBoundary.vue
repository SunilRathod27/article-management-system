<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

const hasError = ref(false)

onErrorCaptured((error) => {
  hasError.value = true
  console.error('Unhandled component error:', error)
  return false
})
</script>

<template>
  <div v-if="hasError" role="alert" class="flex flex-col items-center justify-center gap-2 px-6 py-20 text-center">
    <p class="text-base font-medium text-gray-800">Something went wrong.</p>
    <p class="text-sm text-gray-500">Please refresh the page and try again.</p>
  </div>
  <slot v-else />
</template>
