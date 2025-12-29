<template>
  <div class="container animate-fade-in">
    <div class="header-section animate-slide-up">
      <!-- Title removed as requested -->
      <div class="action-bar">
        <NuxtLink to="/blogs/create" class="btn btn-primary create-btn">
          <i class="pi pi-plus" style="margin-right: 0.5rem"></i> Write a Story
        </NuxtLink>
      </div>
    </div>

    <div v-if="pending" class="loading-spinner"></div>
    
    <div v-else-if="error" class="error-message animate-scale-in">
      Failed to load blogs. Please try again later.
    </div>

    <div v-else class="grid">
      <div 
        v-for="(blog, index) in blogs" 
        :key="blog._id" 
        class="card blog-card"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="card-content">
          <h2 class="blog-title">{{ blog.title }}</h2>
          <div class="blog-meta">By {{ blog.author || 'Unknown' }}</div>
          <p class="blog-excerpt">{{ truncate(blog.content, 120) }}</p>
        </div>
        
        <div class="card-actions">
          <NuxtLink :to="`/blogs/${blog._id}`" class="read-more">
            Read Article
          </NuxtLink>
          <div class="action-buttons">
            <NuxtLink :to="`/blogs/${blog._id}/edit`" class="btn-icon edit-btn" title="Edit Blog">
              <i class="pi pi-pencil"></i>
            </NuxtLink>
            <button @click="deleteBlog(blog._id)" class="btn-icon delete-btn" title="Delete Blog">
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const blogs = ref([]);
const pending = ref(false);
const error = ref(null);

const fetchBlogs = async () => {
  pending.value = true;
  error.value = null;
  try {
    blogs.value = await $fetch('http://localhost:3000/api/blogs');
  } catch (e) {
    error.value = e;
  } finally {
    pending.value = false;
  }
};

const deleteBlog = async (id) => {
  if (!confirm('Are you sure you want to delete this story?')) return;
  
  try {
    await $fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: 'DELETE'
    });
    blogs.value = blogs.value.filter(blog => blog._id !== id);
  } catch (e) {
    alert('Failed to delete blog');
    console.error(e);
  }
};

const truncate = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

onMounted(() => {
  fetchBlogs();
});
</script>

<style scoped>
.header-section {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
}

.blog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: slideUp 0.6s ease-out backwards;
  /* Glass effect from original design */
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

.card-content {
  flex-grow: 1;
}

.blog-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  line-height: 1.3;
}

.blog-meta {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-weight: 500;
}

.blog-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.read-more {
  color: var(--primary-color);
  font-weight: 600;
  padding: 0.5rem 0;
  position: relative;
}

.read-more::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.read-more:hover::after {
  width: 100%;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.btn-icon:hover {
  background-color: #f1f5f9;
  color: var(--primary-color);
  transform: translateY(-2px);
}

.delete-btn:hover {
  background-color: #fee2e2;
  color: var(--danger-color);
}

.error-message {
  text-align: center;
  color: var(--danger-color);
  padding: 2rem;
  background: #fee2e2;
  border-radius: var(--border-radius);
  animation: scaleIn 0.4s ease-out;
}

@media (max-width: 768px) {
  .header-section {
    justify-content: center;
    margin-bottom: 2rem;
  }
  
  .blog-title {
    font-size: 1.25rem;
  }
}
</style>
