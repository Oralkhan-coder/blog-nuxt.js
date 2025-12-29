<template>
  <div class="container">
    <div class="form-container animate-slide-up">
      <h1 class="page-title">Edit Story</h1>

      <div v-if="loading" class="loading-spinner"></div>
      
      <form v-else @submit.prevent="updateBlog" class="blog-form card">
        <div class="form-group">
          <label for="title">Title</label>
          <input 
            v-model="form.title" 
            type="text" 
            id="title" 
            placeholder="Enter title..." 
            required
          >
        </div>

        <div class="form-group">
          <label for="author">Author Name</label>
          <input 
            v-model="form.author" 
            type="text" 
            id="author" 
            placeholder="Enter author name..." 
            required
          >
        </div>

        <div class="form-group">
          <label for="content">Story Content</label>
          <textarea 
            v-model="form.body" 
            id="content" 
            rows="12" 
            placeholder="Edit your story..." 
          ></textarea>
        </div>

        <div class="form-actions">
          <NuxtLink to="/blogs" class="btn btn-secondary">Cancel</NuxtLink>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            <span v-if="submitting">Updating...</span>
            <span v-else>Update Story</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const blogId = route.params.id;

const loading = ref(true);
const submitting = ref(false);
const form = reactive({
  title: '',
  author: '',
  body: ''
});

onMounted(async () => {
  try {
    const blog = await $fetch(`http://localhost:3000/api/blogs/${blogId}`);
    form.title = blog.title;
    form.author = blog.author;
    form.body = blog.content || blog.body;
  } catch (e) {
    console.error('Failed to fetch blog', e);
    alert('Failed to load blog details.');
    router.push('/blogs');
  } finally {
    loading.value = false;
  }
});

const updateBlog = async () => {
  submitting.value = true;
  try {
    await $fetch(`http://localhost:3000/api/blogs/${blogId}`, {
      method: 'PUT',
      body: form
    });
    router.push('/blogs');
  } catch (e) {
    console.error('Update failed', e);
    alert('Failed to update blog.');
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
