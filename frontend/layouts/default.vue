<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <header class="border-b border-gray-200 dark:border-gray-700">
      <nav class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-900 dark:text-white">
            Blog
          </NuxtLink>
          <div class="flex space-x-4">
            <NuxtLink 
              v-for="item in navigation" 
              :key="item.path"
              :to="item.path"
              class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="border-t border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-300">
        &copy; {{ new Date().getFullYear() }} My Blog. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Articles', path: '/articles' },
  { name: 'Categories', path: '/categories' },
  { name: 'About', path: '/about' }
]
</script>
