<script setup lang="ts">
import type { Article } from '../../models/domain/article.domain'
import ArticleImage from './ArticleImage.vue'

defineProps<{
  article: Article
}>()
</script>

<template>
  <NuxtLink
    :to="`/articles/${article.id}`"
    class="flex flex-col overflow-hidden rounded-lg bg-brand-card transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
  >
    <ArticleImage :src="article.imageUrl" :alt="article.title" aspect="grid" />
    <p class="line-clamp-2 p-2 text-xs text-white">{{ article.title }}</p>
  </NuxtLink>
</template>
