<!-- components/SearchDialog.vue -->
<template>
  <div class="fixed inset-0 z-50">
    <!-- 背景遮罩 -->
    <div 
      class="absolute inset-0 bg-black/50 backdrop-blur-sm"
      @click="$emit('close')"
    />
    
    <!-- 搜尋框 -->
    <div class="fixed inset-x-4 top-24 max-w-2xl mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <!-- 搜尋輸入區 -->
        <div class="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700">
          <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜尋文章、分類或標籤..."
            class="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
            @keyup.esc="$emit('close')"
          >
          <kbd class="hidden md:block px-2 py-0.5 text-xs text-gray-400 dark:text-gray-500 border rounded">
            ESC
          </kbd>
        </div>

        <!-- 快速建議區域 -->
        <div class="p-2">
          <div class="text-xs font-medium text-gray-400 dark:text-gray-500 px-3 py-2">
            最近搜尋
          </div>
          
          <button
            v-for="(item, index) in recentSearches"
            :key="index"
            class="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-300 
                   hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Icon name="heroicons:clock" class="w-4 h-4 text-gray-400" />
            {{ item }}
          </button>

          <!-- 熱門標籤 -->
          <div class="text-xs font-medium text-gray-400 dark:text-gray-500 px-3 py-2 mt-4">
            熱門標籤
          </div>
          <div class="px-3 py-2 flex flex-wrap gap-2">
            <button
              v-for="(tag, index) in popularTags"
              :key="index"
              class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 
                     text-gray-600 dark:text-gray-300 hover:bg-gray-200 
                     dark:hover:bg-gray-600 transition-colors"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')

// 模擬資料
const recentSearches = [
  'Nuxt 3 新功能',
  'TailwindCSS 技巧',
  'Vue.js 最佳實踐',
  'TypeScript 教學'
]

const popularTags = [
  'Vue',
  'Nuxt',
  'TailwindCSS',
  'TypeScript',
  'JavaScript',
  'Web Development'
]
</script>
