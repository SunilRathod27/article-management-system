<script setup lang="ts">
import { computed } from 'vue'
import { useArticles } from '../composables/useArticles'
import { useArticlesStore } from '../stores/articles.store'
import { useViewMode } from '../composables/useViewMode'
import AppHeader from '../components/common/AppHeader.vue'
import ArticleListCard from '../components/articles/ArticleListCard.vue'
import ArticleGridCard from '../components/articles/ArticleGridCard.vue'
import UiSkeletonCard from '../components/ui/UiSkeletonCard.vue'
import UiEmptyState from '../components/ui/UiEmptyState.vue'
import UiErrorMessage from '../components/ui/UiErrorMessage.vue'
import type { ViewMode } from '../types'

useHead({
  title: 'Articles',
  meta: [{ name: 'description', content: 'Browse the latest articles.' }],
})

const { fetchArticles } = useArticles()
const store = useArticlesStore()
const { viewMode, setMode } = useViewMode()

await fetchArticles()

const gridClass = computed(() =>
  viewMode.value === 'grid'
    ? 'grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4'
    : 'grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3'
)

function handleViewModeUpdate(mode: ViewMode): void {
  setMode(mode)
}

function handleRetry(): void {
  store.reset()
  void fetchArticles()
}
</script>

<template>
  <div>
    <AppHeader :view-mode="viewMode" @update:view-mode="handleViewModeUpdate" />
    <main class="w-full px-4 py-4 md:px-6 lg:mx-auto lg:max-w-7xl">
      <UiErrorMessage v-if="store.error" :message="store.error" @retry="handleRetry" />
      <div v-else-if="store.isLoading" aria-busy="true" :class="gridClass">
        <UiSkeletonCard v-for="n in 6" :key="n" :variant="viewMode" />
      </div>
      <UiEmptyState
        v-else-if="!store.hasArticles"
        title="No articles yet"
        message="Check back later for new content."
      />
      <div v-else :class="gridClass">
        <template v-for="article in store.articles" :key="article.id">
          <ArticleGridCard v-if="viewMode === 'grid'" :article="article" />
          <ArticleListCard v-else :article="article" />
        </template>
      </div>
    </main>
  </div>
</template>
