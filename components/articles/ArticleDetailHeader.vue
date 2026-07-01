<script setup lang="ts">
import { computed } from 'vue'
import type { Article } from '../../models/domain/article.domain'
import { formatRelativeTime } from '../../utils/date'
import ArticleImage from './ArticleImage.vue'

const props = defineProps<{
  article: Article
}>()

const timeLabel = computed(() => formatRelativeTime(props.article.publishedAt))
</script>

<template>
  <header class="bg-brand-detail-header">
    <div class="flex items-center justify-between px-4 pt-4">
      <NuxtLink
        to="/"
        aria-label="Back to articles"
        class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z"
            clip-rule="evenodd"
          />
        </svg>
      </NuxtLink>
      <span class="text-base font-medium text-white">Article</span>
      <button
        type="button"
        aria-label="Save article"
        class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" class="h-4 w-4" aria-hidden="true">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M10 17.25l-6.16-5.66a4 4 0 010-5.83 4.2 4.2 0 015.77 0L10 6.15l.39-.39a4.2 4.2 0 015.77 0 4 4 0 010 5.83L10 17.25z"
          />
        </svg>
      </button>
    </div>
    <div class="px-4 pt-4">
      <h1 class="text-2xl font-bold leading-tight text-white">{{ article.title }}</h1>
      <p class="mt-2 flex items-center gap-1 text-xs text-gray-300">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" class="h-3.5 w-3.5" aria-hidden="true">
          <circle cx="10" cy="10" r="7" stroke-width="1.5" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6v4l2.5 2" />
        </svg>
        {{ timeLabel }}
      </p>
    </div>
    <div class="mt-4">
      <ArticleImage :src="article.imageUrl" :alt="article.title" aspect="hero" />
    </div>
  </header>
</template>
