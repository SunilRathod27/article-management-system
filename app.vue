<script setup lang="ts">
import AppErrorBoundary from './components/common/AppErrorBoundary.vue'
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <AppErrorBoundary>
      <NuxtPage />
    </AppErrorBoundary>
  </div>
</template>
