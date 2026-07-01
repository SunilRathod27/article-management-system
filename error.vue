<script setup lang="ts">
import { computed } from 'vue'
import UiErrorMessage from './components/ui/UiErrorMessage.vue'

const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

const errorMessage = computed(() => {
  if (props.error.statusCode === 404) {
    return props.error.statusMessage || props.error.message || 'Page not found.'
  }
  return 'Please connect to the internet and try again.'
})

function handleRetry(): void {
  clearError({ redirect: '/' })
}
</script>

<template>
  <UiErrorMessage full-page :message="errorMessage" @retry="handleRetry" />
</template>
