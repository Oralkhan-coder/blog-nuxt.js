<template>
  <div class="container">
    <div class="form-container animate-slide-up">
      <h1 class="page-title">Publish a Story</h1>

      <form @submit.prevent="createBlog" class="blog-form card">
        <div class="form-group">
          <label for="title">Title</label>
          <input v-model="form.title" type="text" id="title" placeholder="Enter an engaging title..." required
            class="animate-fade-in" style="animation-delay: 0.1s">
        </div>

        <div class="form-group">
          <label for="title">Author Name</label>
          <input v-model="form.author" type="text" id="author" placeholder="Enter an engaging title..."
            class="animate-fade-in" style="animation-delay: 0.1s">
        </div>

        <!-- <div class="form-group">
          <label for="content">Story Content</label>
          <textarea 
            v-model="form.body" 
            id="body" 
            rows="12" 
            placeholder="Tell your story..." 
            class="animate-fade-in"
            style="animation-delay: 0.2s"
          ></textarea>
        </div> -->

        <div class="form-group">
          <label for="content">Story Content</label>
          <TinyEditor v-model="form.body" />
        </div>


        <div class="form-actions animate-fade-in" style="animation-delay: 0.3s">
          <NuxtLink to="/blogs" class="btn btn-secondary">Cancel</NuxtLink>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            <span v-if="submitting">Publishing...</span>
            <span v-else>Publish Story</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const submitting = ref(false);
const form = reactive({
  title: '',
  author: '',
  body: ''
});

const createBlog = async () => {
  submitting.value = true;
  try {
    await $fetch('http://localhost:3000/api/blogs', {
      method: 'POST',
      body: form
    });
    router.push('/blogs');
  } catch (e) {
    alert('Failed to create blog. Please try again.');
    console.error(e);
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
}

.blog-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: white;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-group label {
  font-weight: 600;
  color: var(--text-color);
  font-size: 1.1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid transparent;
}

.btn-secondary:hover {
  color: var(--text-color);
  background-color: #f1f5f9;
}
</style>
