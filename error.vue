<template>
  <div class="error-container">
    <div class="error-content animate-slide-up">
      <div class="error-code">{{ error.statusCode }}</div>
      <h1 class="error-title">{{ title }}</h1>
      <p class="error-messsage">{{ message }}</p>
      
      <div class="actions">
        <button @click="handleClearError" class="btn btn-primary home-btn">
          <span>Go Back Home</span>
        </button>
      </div>
    </div>

    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      if (this.error.statusCode === 404) {
        return 'Page Not Found';
      }
      return 'An Error Occurred';
    },
    message() {
      if (this.error.statusCode === 404) {
        return "Oops! The page you're looking for seems to have vanished into thin air.";
      }
      return this.error.message || "Something went wrong on our end. Please try again later.";
    }
  },
  methods: {
    handleClearError() {
      clearError({ redirect: '/' });
    }
  }
}
</script>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.error-content {
  text-align: center;
  z-index: 10;
  padding: 2rem;
  max-width: 600px;
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -0.05em;
  text-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
}

.error-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
}

.error-messsage {
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.home-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);
}

.home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.6);
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
}

.home-btn:active {
  transform: translateY(0);
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  pointer-events: none;
}

.circle-1 {
  width: 400px;
  height: 400px;
  background: #3b82f6;
  top: -100px;
  right: -100px;
  filter: blur(80px);
}

.circle-2 {
  width: 600px;
  height: 600px;
  background: #8b5cf6;
  bottom: -200px;
  left: -200px;
  filter: blur(100px);
}
</style>
