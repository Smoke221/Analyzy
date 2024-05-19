<template>
  <div class="file-upload-container">
    <div @dragover.prevent @drop.prevent="handleDrop" class="drop-zone">
      <span class="material-symbols-outlined">
        upload
      </span>
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
            <span @click="removeFile(file)" class="material-symbols-outlined remove-button">
              delete
            </span>
          </li>
          <li class="upload-button-container">
            <button @click="uploadFiles">Upload</button>
          </li>
        </ul>
      </div>
      <div v-else class="empty-message-container">
        <p>Start analyzing by selecting files.</p>
        <p>Drag and drop files above.</p>
      </div>
    </div>
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

      //triggering the file section dialog.
      input.click();
    };

    const uploadFiles = () => {
      const checkedFiles = files.value.filter((file) => document.getElementById(`checkbox-${file.name}`).checked);

      // Disaplying message about none files selected.
      if (checkedFiles.length === 0) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('no-files-message');
        messageContainer.textContent = 'No files selected for upload.';
        document.querySelector('.file-container').appendChild(messageContainer);

        // Removing the message after 2 seconds.
        setTimeout(() => {
          messageContainer.remove();
        }, 2000);

        return;
      }
      console.log('Uploading checked files:', checkedFiles);

      for (const file of checkedFiles) {
        //If the file is uploaded delete it from the selected files.
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

    return { files, handleDrop, removeFile, openFileDialog, formatFileSize, uploadFiles };
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

.file-list li {
  display: flex;
  justify-content: start;
  gap: 10px;
  padding: 5px 0;
}

.remove-button {
  cursor: pointer;
  color: #c8c8c8;
}

.remove-button:hover {
  color: #888;
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

.empty-message-container {
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  max-width: 400px;
  margin: 20px auto;
}

.empty-message-container p {
  margin: 10px 0;
  font-size: 16px;
  color: #333;
}

.empty-message-container p:first-child {
  font-weight: bold;
}
</style>