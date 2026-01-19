<template>
  <div class="container animate-fade-in">
    <div v-if="pending" class="loading-spinner"></div>

    <div v-else-if="error" class="error-wrapper animate-scale-in">
      <div class="error-message">
        <h2>Blog not found</h2>
        <p>The blog post you are looking for doesn't exist or has been removed.</p>
        <NuxtLink to="/blogs" class="btn btn-primary">Back to Blogs</NuxtLink>
      </div>
    </div>

    <div v-else class="blog-detail animate-slide-up">
      <NuxtLink to="/blogs" class="back-link">
        <i class="pi pi-arrow-left"></i> Back to Blogs
      </NuxtLink>

      <article class="card content-card">
        <header class="article-header animate-fade-in" style="animation-delay: 0.1s">
          <h1 class="article-title">{{ blog.title }}</h1>
          <div class="article-meta">
            <div class="meta-item author">
              <i class="pi pi-user"></i>
              <span>{{ blog.author || 'Anonymous' }}</span>
            </div>
            <span class="separator">•</span>
            <div class="meta-item date">
              <i class="pi pi-calendar"></i>
              <span>{{ formattedDate }}</span>
            </div>
            <span class="separator">•</span>
            <div class="meta-item read-time">
              <i class="pi pi-clock"></i>
              <span>{{ readTime }} min read</span>
            </div>
          </div>
        </header>

        <div class="article-content animate-fade-in" style="animation-delay: 0.2s" v-html="blog.body">
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const blog = ref({});
const pending = ref(true);
const error = ref(null);

const fetchBlog = async () => {
  pending.value = true;
  error.value = null;
  const id = route.params.id;

  try {
    blog.value = await $fetch(`http://localhost:3000/api/blogs/${id}`);
  } catch (e) {
    error.value = e;
    console.error('Error fetching blog:', e);
  } finally {
    pending.value = false;
  }
};

const formattedDate = computed(() => {
  if (!blog.value.created_at) return 'Recently'; // Fallback if no date
  return new Date(blog.value.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const readTime = computed(() => {
  const content = blog.value.content || blog.value.body;
  if (!content) return 1;
  const wordsPerMinute = 200;
  // Strip HTML tags for word count
  const text = content.replace(/<[^>]*>?/gm, '');
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
});

onMounted(() => {
  fetchBlog();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-detail {
  max-width: 900px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: var(--text-secondary);
  font-weight: 600;
  transition: all 0.2s ease;
  text-decoration: none;
}

.back-link:hover {
  color: var(--primary-color);
  transform: translateX(-5px);
}

.content-card {
  padding: 4rem;
  background: rgba(255, 255, 255, 0.85);
  /* Glassmorphism base */
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
}

.article-header {
  margin-bottom: 3.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  text-align: center;
}

.article-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1e293b, #334155);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Fallback for title color if gradient doesn't work well on some screens */
@supports not (-webkit-background-clip: text) {
  .article-title {
    color: #1e293b;
  }
}


.article-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-item i {
  color: var(--primary-color);
  opacity: 0.8;
}

.separator {
  color: #cbd5e1;
}

.article-content {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #334155;
  white-space: pre-wrap;
  font-family: 'Merriweather', 'Georgia', serif;
  /* Serif for better long-form readability */
}

/* Error State */
.error-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.error-message {
  text-align: center;
  padding: 3rem;
  background: #fee2e2;
  border-radius: 16px;
  color: #991b1b;
}

.error-message h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .content-card {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }

  .article-title {
    font-size: 2.25rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.75rem;
  }

  .separator {
    display: none;
  }
}
</style>
