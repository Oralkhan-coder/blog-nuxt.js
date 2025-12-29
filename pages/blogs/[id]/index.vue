<template>
  <div class="container">
    <div v-if="pending" class="loading-spinner"></div>

    <div v-else-if="error" class="error-wrapper animate-scale-in">
      <div class="error-message">
        <h2>Blog not found</h2>
        <p>The blog post you are looking for doesn't exist or has been removed.</p>
        <NuxtLink to="/blogs" class="btn btn-primary">Back to Blogs</NuxtLink>
      </div>
    </div>

    <div v-else class="blog-detail animate-slide-up">
      <NuxtLink to="/blogs" class="back-link">← Back to Blogs</NuxtLink>
      
      <article class="card content-card">
        <header class="article-header animate-fade-in" style="animation-delay: 0.1s">
          <h1 class="article-title">{{ blog.title }}</h1>
          <div class="article-meta">
            <span class="meta-item">Article ID: {{ blog._id }}</span>
            <span class="meta-item">•</span>
            <span class="meta-item">5 min read</span>
          </div>
        </header>

        <div class="article-content animate-fade-in" style="animation-delay: 0.2s">
          {{ blog.content }}
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blog: {},
      pending: true,
      error: null
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    this.pending = true;
    try {
      this.blog = await $fetch(`http://localhost:3000/api/blogs/${id}`);
    } catch (e) {
      this.error = e;
    } finally {
      this.pending = false;
    }
  }
}
</script>

<style scoped>
.blog-detail {
  max-width: 900px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: transform 0.2s;
}

.back-link:hover {
  color: var(--primary-color);
  transform: translateX(-4px);
}

.content-card {
  padding: 4rem;
  background: white;
  box-shadow: var(--shadow-xl);
}

.article-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f1f5f9;
  text-align: center;
}

.article-title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(135deg, var(--text-color), #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.article-meta {
  color: var(--text-secondary);
  font-size: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.article-content {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #334155;
  white-space: pre-wrap;
  font-family: 'Merriweather', serif;
}

.error-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.error-message {
  text-align: center;
}

.error-message h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.error-message p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .content-card {
    padding: 2rem;
  }
  
  .article-title {
    font-size: 2rem;
  }
}
</style>
