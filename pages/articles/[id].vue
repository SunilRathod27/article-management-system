<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticles } from '../../composables/useArticles'
import { useArticlesStore } from '../../stores/articles.store'
import ArticleDetailHeader from '../../components/articles/ArticleDetailHeader.vue'
import UiEmptyState from '../../components/ui/UiEmptyState.vue'
import UiErrorMessage from '../../components/ui/UiErrorMessage.vue'

const route = useRoute()
const router = useRouter()
const { fetchArticles, getArticleById } = useArticles()
const store = useArticlesStore()

await fetchArticles()

const article = computed(() => getArticleById(String(route.params.id)))

useHead(() => ({
  title: article.value ? article.value.title : 'Article not found',
}))

function handleRetry(): void {
  store.reset()
  void fetchArticles()
}

function goToList(): void {
  void router.push('/')
}
</script>

<template>
  <div>
    <UiErrorMessage v-if="store.error" :message="store.error" @retry="handleRetry" />
    <UiEmptyState
      v-else-if="!article"
      title="Article not found"
      message="This article may have been removed or the link is incorrect."
      action-label="Back to articles"
      @action="goToList"
    />
    <template v-else>
      <ArticleDetailHeader :article="article" />
      <article class="mx-auto max-w-3xl px-4 py-4">
        <p class="whitespace-pre-line text-sm leading-relaxed text-gray-700 md:text-base">
          {{ article.content || 'No content available for this article.' }}
        </p>
      </article>
    </template>
  </div>
</template>
