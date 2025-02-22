<!-- pages/posts/index.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 頁面標題 -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        所有文章
      </h1>

      <NuxtLink
        to="http://localhost:8000/admin"
        target="_blank"
        class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>新增文章</span>
      </NuxtLink>
    </div>

    <!-- 加載中狀態 -->
    <div v-if="postStore.loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <!-- 錯誤提示 -->
    <div v-else-if="postStore.error" class="bg-red-50 dark:bg-red-900/50 p-4 rounded-lg mb-6">
      <p class="text-red-600 dark:text-red-400">{{ postStore.error }}</p>
    </div>

    <!-- 文章列表 -->
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="post in postStore.posts"
        :key="post.id"
        class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <!-- 文章主體部分作為可點擊區域 -->
        <NuxtLink :to="`/posts/${post.id}`" class="block">
          <!-- 縮略圖 -->
          <div class="relative h-48 overflow-hidden">
            <img
              v-if="post.thumbnail"
              :src="post.thumbnail"
              :alt="post.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            >
            <!-- 無圖片時的佔位符 -->
            <div
              v-else
              class="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <!-- 發布日期 -->
            <time
              class="absolute bottom-3 right-3 px-2 py-1 bg-black/50 text-white text-sm rounded-md backdrop-blur-sm"
            >
              {{ new Date(post.created).toLocaleDateString() }}
            </time>
          </div>

          <div class="p-6">
            <!-- 標題 -->
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ post.title }}
            </h2>
            <!-- 摘要 -->
            <p class="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
              {{ post.content }}
            </p>
            <!-- 標籤 -->
            <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-md"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>

        <!-- 操作按鈕 -->
        <div class="px-6 pb-6 flex justify-end gap-2 text-sm">
          <button
            @click="editPost(post)"
            class="inline-flex items-center gap-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>編輯</span>
          </button>
          <button
            @click="confirmDelete(post)"
            class="inline-flex items-center gap-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>刪除</span>
          </button>
        </div>
      </article>
    </div>

    <!-- 編輯/創建模態框 -->
    <PostFormModal
      v-if="showCreateModal || editingPost"
      :post="editingPost"
      @save="savePost"
      @close="closeModal"
    />

    <!-- 刪除確認模態框 -->
    <ConfirmDialog
      v-if="showDeleteConfirm"
      :title="'確認刪除'"
      :message="'確定要刪除這篇文章嗎？此操作無法撤銷。'"
      @confirm="handleDelete"
      @cancel="showDeleteConfirm = false"
    />

  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/stores/usePostStore'
import type { Post } from '~/types/post'

const postStore = usePostStore()
const showCreateModal = ref(false)
const showDeleteConfirm = ref(false)
const editingPost = ref<Post | null>(null)
const postToDelete = ref<Post | null>(null)

onMounted(async () => {
  await postStore.fetchPosts()
})

// 打開編輯模態框
const editPost = (post: Post) => {
  editingPost.value = post
}

// 打開刪除確認框
const confirmDelete = (post: Post) => {
  postToDelete.value = post
  showDeleteConfirm.value = true
}

// 處理保存
const savePost = async (postData: any) => {
  try {
    if (editingPost.value) {
      await postStore.updatePost({ ...postData, id: editingPost.value.id })
    } else {
      await postStore.createPost(postData)
    }
    closeModal()
  } catch (err) {
    console.error('Failed to save post:', err)
  }
}

// 處理刪除
const handleDelete = async () => {
  if (postToDelete.value) {
    try {
      await postStore.deletePost(postToDelete.value.id)
      showDeleteConfirm.value = false
      postToDelete.value = null
    } catch (err) {
      console.error('Failed to delete post:', err)
    }
  }
}

// 關閉模態框
const closeModal = () => {
  showCreateModal.value = false
  editingPost.value = null
}
</script>
