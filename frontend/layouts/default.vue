<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 導航欄 -->
    <header class="fixed top-8 left-0 right-0 z-50">
      <nav class="mx-4">
        <div class="container mx-auto max-w-5xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div class="px-6 py-3 flex justify-between items-center">
            <!-- Logo -->
            <NuxtLink to="/" class="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              Tech Blog
            </NuxtLink>

            <!-- Navigation Links -->
            <div class="flex items-center space-x-2">
              <NuxtLink
                v-for="item in navigation"
                :key="item.path"
                :to="item.path"
                class="px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100
                       dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700
                       transition-all duration-200 text-sm font-medium"
              >
                {{ item.name }}
              </NuxtLink>

              <!-- 搜尋組件 -->
              <button
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors
                       flex items-center gap-2 text-gray-500 dark:text-gray-400"
                @click="toggleSearch"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <kbd class="hidden sm:inline-block px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  ⌘K
                </kbd>
              </button>

              <!-- 主題切換按鈕 -->
              <button
                @click="toggleColorMode"
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300"
              >
                <svg v-if="!colorMode.value || colorMode.value === 'light'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- 主要內容區塊 -->
    <main class="container mx-auto px-4 pt-24 pb-16">
      <slot />
    </main>

    <!-- 重新設計的頁尾 -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="container mx-auto max-w-5xl px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo 和描述 -->
          <div class="col-span-1 md:col-span-2">
            <div class="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
              Tech Blog
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              分享技術、探索創新、連結未來
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span class="sr-only">GitHub</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- 快速導航 -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              快速導航
            </h3>
            <ul class="space-y-3">
              <li v-for="item in navigation" :key="item.path">
                <NuxtLink
                  :to="item.path"
                  class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- 聯絡資訊 -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              聯絡我們
            </h3>
            <ul class="space-y-3">
              <li>
                <a href="mailto:contact@techblog.com" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  contact@techblog.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 版權信息 -->
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p class="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {{ new Date().getFullYear() }} Tech Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    <!-- 搜尋對話框 -->
    <SearchDialog v-if="isSearchOpen" @close="closeSearch" />
  </div>
</template>

<script setup lang="ts">
const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Articles', path: '/articles' },
  { name: 'Categories', path: '/categories' },
  { name: 'About', path: '/about' }
]

const colorMode = useColorMode()
const isSearchOpen = ref(false)

// 切換主題
const toggleColorMode = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}

// 搜尋相關
const toggleSearch = () => {
  isSearchOpen.value = true
}

const closeSearch = () => {
  isSearchOpen.value = false
}

// 鍵盤快捷鍵
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      toggleSearch()
    }
    if (e.key === 'Escape' && isSearchOpen.value) {
      closeSearch()
    }
  }

  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})
</script>
