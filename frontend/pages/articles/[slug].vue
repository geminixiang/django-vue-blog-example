<template>
  <div v-if="article" class="max-w-3xl mx-auto">
    <article class="prose dark:prose-invert lg:prose-xl">
      <h1>{{ article.title }}</h1>
      <div class="text-gray-500 mb-8">
        <time>{{ new Date(article.created_at).toLocaleDateString() }}</time>
      </div>
      
      <!-- 使用 v-html 需確保內容安全性 -->
      <div v-html="article.content"></div>

      <div class="mt-8">
        <h3>Tags:</h3>
        <div class="flex gap-2">
          <span 
            v-for="tag in article.tags" 
            :key="tag"
            class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </article>
  </div>

  <div v-else-if="loading" class="flex justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>

  <div v-else-if="error" class="text-red-500">
    {{ error }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const articleStore = useArticleStore()
const { currentArticle: article, loading, error } = storeToRefs(articleStore)

onMounted(() => {
  if (typeof route.params.slug === 'string') {
    articleStore.fetchArticleBySlug(route.params.slug)
  }
})
</script>
