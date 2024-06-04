<template>
  <div class="file-upload-container">
    <div @dragover.prevent @drop.prevent="handleDrop" class="drop-zone">
      <span class="material-symbols-outlined">upload</span>
      <h2>Drop your files here</h2>
      <p>or</p>
      <h3><span @click="openFileDialog" class="selectFile">Browse</span> files</h3>
    </div>
    <div class="file-container">
      <h2 v-if="files.length > 0">Selected Files</h2>
      <div class="selected-files-box" v-if="files.length > 0">
        <ul v-if="files.length" class="file-list">
          <li v-for="file in files" :key="file.name">
            <input type="checkbox" :id="`checkbox-${file.name}`" />
            <label :for="`checkbox-${file.name}`">{{ file.name }} ({{ formatFileSize(file.size) }})</label>
            <span @click="removeFile(file)" class="material-symbols-outlined remove-button">delete</span>
          </li>
          <li class="upload-button-container">
            <button class="upload-button" @click="uploadFiles">Upload</button>
          </li>
        </ul>
      </div>
      <div v-if="uploadedFiles.length > 0" class="uploaded-files-container">
        <h2>Uploaded Files</h2>
        <ul>
          <li v-for="file in uploadedFiles" :key="file._id">
            <span>{{ file.fileName }}</span>
            <div id="buttons-container">
              <button @click="analyzeFile(file._id)">Analyze</button>
              <button class="material-symbols-outlined" @click="deleteFile(file._id)">delete</button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else-if="uploadedFiles.length === 0">
        <h4>No files uploaded yet.</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import deleteFile from '../mixins/deleteFile.js'
import { useRoute, useRouter } from 'vue-router';

// Set up Axios to send cookies with requests
axios.defaults.withCredentials = true;

export default {
  mixins: [deleteFile],
  setup() {
    const files = ref([]);
    const uploadedFiles = ref([]);
    const router = useRouter(); // Get the router instance

    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:3000/files");
        if (response.status === 200) {
          uploadedFiles.value = response.data.files;
        } else {
          console.error('Error fetching files:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    });

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
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.accept = '.pdf';

      input.addEventListener('change', (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          files.value.push(file);
        }
      });

      input.click();
    };

    const uploadFiles = async () => {
      const checkedFiles = files.value.filter((file) => document.getElementById(`checkbox-${file.name}`).checked);

      if (checkedFiles.length === 0) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('no-files-message');
        messageContainer.textContent = 'No files selected for upload.';
        document.querySelector('.file-container').appendChild(messageContainer);

        setTimeout(() => {
          messageContainer.remove();
        }, 2000);

        return;
      }

      try {
        const formData = new FormData();
        checkedFiles.forEach((file) => {
          formData.append('uploadedFile', file);
        });

        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data);
        uploadedFiles.value = [...uploadedFiles.value, ...response.data.uploadedFiles];
      } catch (err) {
        console.error('Error uploading files:', err);
      }

      for (const file of checkedFiles) {
        const index = files.value.findIndex((f) => f === file);
        if (index !== -1) {
          files.value.splice(index, 1);
        }
      }
    };

    const formatFileSize = (fileSize) => {
      const units = ['B', 'KB', 'MB'];
      let i = 0;
      let newSize = fileSize;

      while (newSize > 1024 && i < units.length - 1) {
        newSize /= 1024;
        ++i;
      }

      return `${newSize.toFixed(2)}${units[i]}`;
    };

    const analyzeFile = (fileId) => {
      router.push({ name: 'Analyze', params: { fileId } });
    }

    return {
      files,
      handleDrop,
      removeFile,
      openFileDialog,
      formatFileSize,
      uploadFiles,
      uploadedFiles,
      analyzeFile,
    };
  },
};
</script>

<style scoped>
.file-upload-container {
  margin-top: 20px;
}

.drop-zone {
  border: 2px dashed #ccc;
  padding: 20px;
  min-height: 250px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.selectFile {
  cursor: pointer;
  color: #DE9151;
}

.file-list {
  margin-top: 10px;
  list-style: none;
  padding: 0;
}

.file-list li {
  display: flex;
  justify-content: start;
  gap: 10px;
  padding: 5px 0;
}

.remove-button {
  cursor: pointer;
  color: #BBB8B2;
  transition: color 0.2s ease;
}

.remove-button:hover {
  color: #888;
}

.upload-button{
  padding: 10px 20px;
  font-size: 16px;
  background-color: #DE9151;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.upload-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.drop-zone h3,
.drop-zone p {
  margin: 5px 0;
}

.file-container {
  width: 70%;
  padding: 10px;
  margin: auto;
}

.uploaded-files-container {
  margin-top: 20px;
}

.uploaded-files-container h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.uploaded-files-container ul {
  list-style-type: none;
  padding: 0;
}

.uploaded-files-container li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.uploaded-files-container li:last-child {
  border-bottom: none;
}

.uploaded-files-container li div :first-child {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.uploaded-files-container li div :last-child {
  background-color: #f73c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.uploaded-files-container li div :first-child:hover {
  background-color: #0056b3;
}

#buttons-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}
</style>