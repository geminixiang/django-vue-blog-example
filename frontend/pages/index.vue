<template>
  <div>
    <!-- Hero Section -->
    <section class="text-center mb-16">
      <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
        Welcome to Tech Blog
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Exploring the latest in technology, development, and digital innovation
      </p>
    </section>

    <!-- Featured Posts -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
        Featured Posts
      </h2>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article 
          v-for="post in posts" 
          :key="post.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
        >
          <div class="aspect-w-16 aspect-h-9 bg-gray-200">
            <img 
              :src="`https://picsum.photos/seed/${post.id}/800/400`" 
              :alt="post.title"
              class="object-cover w-full h-48"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center mb-4">
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm">
                {{ post.category }}
              </span>
            </div>
            <h3 class="text-xl font-semibold mb-2">
              <NuxtLink 
                :to="`/articles/${post.slug}`"
                class="text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
              >
                {{ post.title }}
              </NuxtLink>
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <img 
                :src="`https://ui-avatars.com/api/?name=${post.author}`"
                :alt="post.author"
                class="w-8 h-8 rounded-full mr-3"
              />
              <span>{{ post.author }}</span>
              <span class="mx-2">•</span>
              <span>{{ new Date(post.created_at).toLocaleDateString() }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
        Browse by Category
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          v-for="category in categories"
          :key="category.name"
          class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
        >
          <span class="block text-xl mb-2">{{ category.icon }}</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ category.name }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const posts = ref([
  {
    id: 1,
    title: 'Getting Started with Nuxt 3',
    slug: 'getting-started-with-nuxt-3',
    excerpt: 'Learn how to build modern web applications with Nuxt 3 and explore its powerful features for creating server-side rendered Vue.js applications.',
    author: 'John Doe',
    created_at: '2024-02-23',
    category: 'Framework'
  },
  {
    id: 2,
    title: 'Why Choose Nuxt for Your Next Project',
    slug: 'why-choose-nuxt',
    excerpt: 'Exploring the benefits of using Nuxt.js framework and how it can help you build better web applications with improved performance and SEO.',
    author: 'Jane Smith',
    created_at: '2024-02-22',
    category: 'Development'
  },
  {
    id: 3,
    title: 'Building Modern UIs with Tailwind CSS',
    slug: 'building-modern-uis-with-tailwind',
    excerpt: 'Discover how to create beautiful and responsive user interfaces using Tailwind CSS utility-first framework.',
    author: 'Mike Johnson',
    created_at: '2024-02-21',
    category: 'Design'
  }
])

const categories = ref([
  { name: 'Framework', icon: '🔧' },
  { name: 'Development', icon: '💻' },
  { name: 'Design', icon: '🎨' },
  { name: 'Security', icon: '🔒' }
])
</script>

<style>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 > img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
