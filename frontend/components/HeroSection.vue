<!-- components/HeroSection.vue -->
<template>
  <section class="relative py-20">
    <!-- 背景裝飾 -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-teal-50/20
                  dark:from-blue-900/20 dark:via-purple-900/20 dark:to-teal-900/20" />
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                  bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl" />
    </div>

    <div class="max-w-4xl mx-auto px-4 text-center">
      <!-- 標題 -->
      <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500
                 to-teal-400 dark:from-blue-400 dark:via-blue-300 dark:to-teal-200
                 bg-clip-text text-transparent animate-gradient pb-2">
        Welcome to Tech Blog
      </h1>

      <!-- 副標題 -->
      <p class="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
        探索最新的技術發展，分享開發經驗，探討數位創新。在這裡，我們一起學習、成長、創造未來。
      </p>

      <!-- 行動按鈕 -->
      <div class="mt-10 flex flex-wrap justify-center gap-4">
        <NuxtLink
          to="/articles"
          class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white
                 font-medium transition-colors duration-200"
        >
          開始閱讀
        </NuxtLink>
        <NuxtLink
          to="/categories"
          class="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800
                 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900
                 dark:text-white font-medium transition-colors duration-200"
        >
          瀏覽分類
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 8s linear infinite;
}
</style>
