<template>
  <Editor v-model="content" :init="init" api-key="wbuzodgjq18aerm6ay7qap23h9h32wlpojk1xdgh1n3s7t8s" />
</template>

<script setup>
import { ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'

const content = ref('')

const init = {
  height: 400,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap preview',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table help wordcount'
  ],
  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
}
</script>
