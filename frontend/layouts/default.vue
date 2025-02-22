<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 導航欄 -->
    <header class="fixed top-0 left-0 right-0 z-50">
      <nav class="mx-4 my-2">
        <div class="container mx-auto max-w-5xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div class="px-4 py-2 flex justify-between items-center">
            <!-- Logo -->
            <NuxtLink to="/" class="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Tech Blog
            </NuxtLink>
            
            <!-- Navigation Links -->
            <div class="flex items-center space-x-1">
              <NuxtLink 
                v-for="item in navigation" 
                :key="item.path"
                :to="item.path"
                class="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 
                       dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 
                       transition-all duration-200 text-sm font-medium"
              >
                {{ item.name }}
              </NuxtLink>
              
              <!-- 搜尋組件 -->
              <button 
                class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors
                       flex items-center gap-2 text-gray-500 dark:text-gray-400"
                @click="toggleSearch"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
              
              <!-- 主題切換按鈕 -->
              <button 
                @click="toggleColorMode"
                class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300"
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
    <main class="container mx-auto px-4 pt-20 pb-12">
      <slot />
    </main>

    <!-- 頁尾 -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="container mx-auto max-w-5xl px-4 py-8">
        <div class="text-center text-gray-600 dark:text-gray-300">
          &copy; {{ new Date().getFullYear() }} Tech Blog. All rights reserved.
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
