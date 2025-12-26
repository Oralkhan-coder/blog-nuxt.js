<template>
  <div class="container animate-fade-in">
    <div class="header-section animate-slide-up">
      <h1 class="page-title">Latest Stories</h1>
      <NuxtLink to="/blogs/create" class="btn btn-primary create-btn">
        <span class="icon">+</span> Write a Story
      </NuxtLink>
    </div>

    <div v-if="pending" class="loading-spinner"></div>
    
    <div v-else-if="error" class="error-message animate-scale-in">
      Failed to load blogs. Please try again later.
    </div>

    <div v-else class="grid">
      <div 
        v-for="(blog, index) in blogs" 
        :key="blog.id" 
        class="card blog-card"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="card-content">
          <h2 class="blog-title">{{ blog.title }}</h2>
          <p class="blog-excerpt">{{ truncate(blog.content, 120) }}</p>
        </div>
        
        <div class="card-actions">
          <NuxtLink :to="`/blogs/${blog._id}`" class="read-more">
            Read Article
          </NuxtLink>
          <button @click="deleteBlog(blog.id)" class="btn-icon delete-btn" title="Delete Blog">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [],
      pending: false,
      error: null
    }
  },
  methods: {
    async fetchBlogs() {
      this.pending = true;
      this.error = null;
      try {
        this.blogs = await $fetch('http://localhost:3000/api/blogs');
      } catch (e) {
        this.error = e;
      } finally {
        this.pending = false;
      }
    },
    async deleteBlog(id) {
      if (!confirm('Are you sure you want to delete this blog?')) return;

      try {
        await $fetch(`http://localhost:3000/api/blogs/${id}`, {
          method: 'DELETE'
        });
        this.fetchBlogs();
      } catch (e) {
        alert('Failed to delete blog');
        console.error(e);
      }
    },
    truncate(text, length) {
      if (!text) return '';
      return text.length > length ? text.substring(0, length) + '...' : text;
    }
  },
  mounted() {
    this.fetchBlogs();
  }
}
</script>

<style scoped>
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
}

.create-btn .icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
  line-height: 1;
}

.blog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: slideUp 0.6s ease-out backwards;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

.card-content {
  flex-grow: 1;
}

.blog-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  line-height: 1.3;
}

.blog-excerpt {
  color: var(--text-secondary);
  line-height: 1.7;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
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
}

.delete-btn:hover {
  background-color: #fee2e2;
  color: var(--danger-color);
  transform: rotate(5deg) scale(1.1);
}

.error-message {
  text-align: center;
  color: var(--danger-color);
  padding: 2rem;
  background: #fee2e2;
  border-radius: var(--border-radius);
  animation: scaleIn 0.4s ease-out;
}
</style>
