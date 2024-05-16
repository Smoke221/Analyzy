<template>
  <div class="file-upload-container">
    <div @dragover.prevent @drop.prevent="handleDrop" class="drop-zone">
      <span class="material-symbols-outlined">
        upload
      </span>
      <h3>Drag and drop files here</h3>
      <p>or</p>
      <h3><span @click="openFileDialog" class="selectFile">Browse</span> files</h3>
    </div>
    <ul v-if="files.length" class="file-list">
      <li v-for="file in files" :key="file.name">
        {{ file.name }} ({{ file.size }} bytes)
        <button @click="removeFile(file)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const files = ref([]);

    const handleDrop = (event) => {
      if (event.dataTransfer.files) {
        for (let i = 0; i < event.dataTransfer.files.length; i++) {
          const file = event.dataTransfer.files[i];
          files.value.push(file);
        }
      } else {
        event.dataTransfer.items.forEach((item) => {
          if (item.kind === 'file') {
            const file = item.getAsFile();
            files.value.push(file);
          }
        });
      }
    };

    const removeFile = (file) => {
      const index = files.value.findIndex((f) => f === file);
      if (index !== -1) {
        files.value.splice(index, 1);
      }
    };

    const openFileDialog = () => {
      // Create a hidden file input element
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true; // Allow multiple file selection
      input.accept = '*'; // Accept any file type (customize if needed)

      // Handle file selection
      input.addEventListener('change', (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          files.value.push(file);
        }
      });

      // Trigger the file selection dialog
      input.click();
    };

    return { files, handleDrop, removeFile, openFileDialog };
  },
};
</script>

<style scoped>
.file-upload-container {
  margin-top: 20px;
}

.drop-zone {
  border: 2px dashed #ccc;
  padding: 10px;
  min-height: 250px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.selectFile {
  cursor: pointer;
  color: #55ACEE;
}

.file-list {
  margin-top: 10px;
}
</style>