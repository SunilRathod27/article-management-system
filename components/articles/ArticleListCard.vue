<script setup lang="ts">
import { computed } from 'vue'
import type { Article } from '../../models/domain/article.domain'
import { formatAbsoluteDate } from '../../utils/date'
import ArticleImage from './ArticleImage.vue'
import UiButton from '../ui/UiButton.vue'

const props = defineProps<{
  article: Article
}>()

const dateLabel = computed(() => formatAbsoluteDate(props.article.publishedAt))
</script>

<template>
  <NuxtLink
    :to="`/articles/${article.id}`"
    class="flex flex-col overflow-hidden rounded-lg bg-white shadow-card transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
  >
    <ArticleImage :src="article.imageUrl" :alt="article.title" aspect="card" />
    <div class="flex flex-1 flex-col gap-2 p-3">
      <p class="line-clamp-2 text-sm text-gray-900">{{ article.title }}</p>
      <div class="mt-auto flex items-center justify-between pt-2">
        <span class="flex items-center gap-1 text-xs text-gray-500">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" class="h-3.5 w-3.5" aria-hidden="true">
            <rect x="3" y="4" width="14" height="13" rx="1.5" stroke-width="1.5" />
            <path stroke-linecap="round" stroke-width="1.5" d="M3 8h14M7 2.5v3M13 2.5v3" />
          </svg>
          {{ dateLabel }}
        </span>
        <UiButton>Read More</UiButton>
      </div>
    </div>
  </NuxtLink>
</template>
