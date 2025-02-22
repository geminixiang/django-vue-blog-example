<!-- pages/posts/[slug].vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 加載中狀態 -->
    <div v-if="postStore.loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <!-- 錯誤提示 -->
    <div v-else-if="postStore.error" class="bg-red-50 dark:bg-red-900/50 p-4 rounded-lg mb-6">
      <p class="text-red-600 dark:text-red-400">{{ postStore.error }}</p>
      <NuxtLink 
        to="/posts" 
        class="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
      >
        返回文章列表
      </NuxtLink>
    </div>

    <!-- 文章內容 -->
    <div v-else-if="post" class="max-w-3xl mx-auto">
      <article class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <!-- 縮略圖 -->
        <img 
          v-if="post.thumbnail" 
          :src="post.thumbnail" 
          :alt="post.title" 
          class="w-full h-64 object-cover"
        >
        
        <div class="p-8">
          <!-- 標題和元資訊 -->
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {{ post.title }}
            </h1>
            <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <time :datetime="post.created">
                {{ new Date(post.created).toLocaleDateString() }}
              </time>
            </div>
          </div>

          <!-- 文章內容 -->
          <div 
            v-html="post.content" 
            class="prose dark:prose-invert max-w-none mb-8"
          ></div>

          <!-- 標籤 -->
          <div v-if="post.tags?.length" class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </article>

      <!-- 導航按鈕 -->
      <div class="flex justify-between items-center mt-8">
        <button
          v-if="postStore.prevPost"
          @click="navigateToPost(postStore.prevPost.id)"
          class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span>上一篇</span>
        </button>
        
        <button
          v-if="postStore.nextPost"
          @click="navigateToPost(postStore.nextPost.id)"
          class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <span>下一篇</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePostStore } from '~/stores/usePostStore'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const { currentPost: post } = storeToRefs(postStore)

// SEO 設定
useHead(() => ({
  title: post.value?.title,
  meta: [
    {
      name: 'description',
      content: post.value?.content.slice(0, 160) || ''
    }
  ]
}))

onMounted(async () => {
  if (typeof route.params.slug === 'string') {
    await postStore.fetchPost(route.params.slug)
  }
})

// 監聽路由變化
watch(
  () => route.params.slug,
  async (newSlug) => {
    if (typeof newSlug === 'string') {
      await postStore.fetchPost(newSlug)
    }
  }
)

// 導航到其他文章
const navigateToPost = (id: string) => {
  router.push(`/posts/${id}`)
}
</script>

<style>
.prose {
  @apply text-gray-900 dark:text-gray-100;
}

.prose h2 {
  @apply text-2xl font-bold mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-bold mt-6 mb-3;
}

.prose p {
  @apply mb-4;
}

.prose a {
  @apply text-blue-600 dark:text-blue-400 hover:underline;
}

.prose ul {
  @apply list-disc list-inside mb-4;
}

.prose ol {
  @apply list-decimal list-inside mb-4;
}

.prose blockquote {
  @apply border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-700 rounded px-1;
}

.prose pre {
  @apply bg-gray-100 dark:bg-gray-800 rounded p-4 overflow-x-auto mb-4;
}
</style>
