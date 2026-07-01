<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-pill bg-brand-primary px-4 py-1.5 text-xs font-medium text-white"
  >
    <slot />
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" class="h-3.5 w-3.5" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5l6 5-6 5" />
    </svg>
  </span>
</template>
