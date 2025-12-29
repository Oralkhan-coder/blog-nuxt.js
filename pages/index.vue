<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1 class="hero-title">Share Your Story</h1>
      <p class="hero-subtitle">
        A modern platform for thinkers, writers, and creators. Join our community and start your journey today.
      </p>
      <div class="hero-actions">
        <NuxtLink to="/blogs" class="btn btn-primary">Start Reading</NuxtLink>
        <NuxtLink to="/blogs/create" class="btn btn-secondary">Write Now</NuxtLink>
      </div>
    </div>

    <!-- Features Section -->
    <div class="container features-section">
      <div class="grid">
        <div class="card feature-card">
          <div class="feature-icon">⚡</div>
          <h3 class="feature-title">Fast Performance</h3>
          <p class="feature-text">Experience lightning-fast page loads and smooth interactions.</p>
        </div>

        <div class="card feature-card">
          <div class="feature-icon">🎨</div>
          <h3 class="feature-title">Modern Design</h3>
          <p class="feature-text">Beautifully crafted interface with a focus on typography and readability.</p>
        </div>

        <div class="card feature-card">
          <div class="feature-icon">👥</div>
          <h3 class="feature-title">Community Driven</h3>
          <p class="feature-text">Connect with other writers and share your unique perspective.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.landing-page {
  animation: fadeIn 0.8s ease-out;
}

.hero-section {
  text-align: center;
  padding: 6rem 1.5rem;
  background: linear-gradient(to bottom, #f8fafc, #f0f4f8);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.05em;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.features-section {
  padding-bottom: 6rem;
}

.feature-card {
  text-align: center;
  height: 100%;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  padding: 1rem;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.1);
}

.feature-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.feature-text {
  color: var(--text-secondary);
  line-height: 1.6;
}

.btn-secondary {
  background: white;
  color: var(--text-color);
  border: 1px solid #cbd5e1;
}

.btn-secondary:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    gap: 1rem;
  }
}
</style>
