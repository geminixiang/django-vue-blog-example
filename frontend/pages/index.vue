<template>
  <div>
    <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
      Latest Posts
    </h1>
    
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article 
        v-for="post in posts" 
        :key="post.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">
            <NuxtLink 
              :to="`/articles/${post.slug}`"
              class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              {{ post.title }}
            </NuxtLink>
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ post.excerpt }}
          </p>
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>{{ new Date(post.created_at).toLocaleDateString() }}</span>
            <span class="mx-2">•</span>
            <span>{{ post.author }}</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
// 這裡先用模擬數據，後續會改為 API 調用
const posts = ref([
  {
    id: 1,
    title: 'Getting Started with Nuxt 3',
    slug: 'getting-started-with-nuxt-3',
    excerpt: 'Learn how to build modern web applications with Nuxt 3',
    author: 'John Doe',
    created_at: '2024-02-23'
  },
  // ... 更多文章
])
</script>