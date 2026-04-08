<template>
  <div class="file-upload-container">
    <div
      class="drop-zone card"
      :class="{ 'drop-zone--active': isDragOver }"
      @dragenter.prevent="onDragEnter"
      @dragleave.prevent="onDragLeave"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <span class="material-symbols-outlined drop-zone__icon">upload</span>
      <h2 class="drop-zone__title">Drop your PDFs here</h2>
      <p class="drop-zone__or">or</p>
      <h3 class="drop-zone__browse">
        <button type="button" class="link-button" @click="openFileDialog">Browse files</button>
      </h3>
    </div>

    <div class="file-container">
      <p v-if="uploadBanner" class="banner banner--info">{{ uploadBanner }}</p>
      <p v-if="uploadError" class="banner banner--error">{{ uploadError }}</p>

      <template v-if="files.length > 0">
        <h2 class="section-title">Ready to upload</h2>
        <div class="selected-files-box card">
          <ul class="file-list">
            <li v-for="(file, idx) in files" :key="fileKey(file, idx)">
              <span class="file-list__name">{{ file.name }} ({{ formatFileSize(file.size) }})</span>
              <button
                type="button"
                class="icon-btn"
                aria-label="Remove from list"
                @click="removeFile(file)"
              >
                <span class="material-symbols-outlined">delete</span>
              </button>
            </li>
            <li class="upload-actions">
              <button
                type="button"
                class="btn-primary"
                :disabled="uploading"
                @click="uploadFiles"
              >
                {{ uploading ? "Uploading…" : "Upload all" }}
              </button>
            </li>
          </ul>
        </div>
      </template>

      <div class="uploaded-files-container">
        <h2 class="section-title">Uploaded files</h2>
        <ul v-if="uploadedFiles.length > 0" class="uploaded-list card">
          <li v-for="file in uploadedFiles" :key="file._id" class="uploaded-list__row">
            <span class="uploaded-list__name">{{ file.fileName }}</span>
            <div class="uploaded-list__actions">
              <button type="button" class="btn-primary btn-primary--sm" @click="analyzeFile(file._id)">
                Analyze
              </button>
              <button
                type="button"
                class="btn-danger btn-danger--sm"
                :disabled="deletingId === file._id"
                @click="deleteUploadedFile(file._id)"
              >
                <span class="material-symbols-outlined" aria-hidden="true">delete</span>
              </button>
            </div>
          </li>
        </ul>
        <p v-else class="empty-hint">No files uploaded yet. Add PDFs above.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { client } from "../api/client.js";

export default {
  setup() {
    const files = ref([]);
    const uploadedFiles = ref([]);
    const router = useRouter();
    const uploading = ref(false);
    const uploadError = ref("");
    const uploadBanner = ref("");
    const isDragOver = ref(false);
    const deletingId = ref(null);
    let dragCounter = 0;

    const fileKey = (file, idx) => `${file.name}-${file.size}-${idx}`;

    async function fetchUploadedFiles() {
      try {
        const { data } = await client.get("/files");
        uploadedFiles.value = data.files || [];
      } catch (error) {
        console.error("Error fetching files:", error);
        uploadError.value = "Could not load your file list.";
      }
    }

    onMounted(() => {
      fetchUploadedFiles();
    });

    function onDragEnter() {
      dragCounter++;
      isDragOver.value = true;
    }

    function onDragLeave() {
      dragCounter = Math.max(0, dragCounter - 1);
      if (dragCounter === 0) {
        isDragOver.value = false;
      }
    }

    const handleDrop = (event) => {
      dragCounter = 0;
      isDragOver.value = false;
      if (event.dataTransfer.files && event.dataTransfer.files.length) {
        for (let i = 0; i < event.dataTransfer.files.length; i++) {
          files.value.push(event.dataTransfer.files[i]);
        }
      }
    };

    const removeFile = (file) => {
      const index = files.value.findIndex((f) => f === file);
      if (index !== -1) {
        files.value.splice(index, 1);
      }
    };

    const openFileDialog = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.multiple = true;
      input.accept = ".pdf,application/pdf";
      input.addEventListener("change", (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
          files.value.push(event.target.files[i]);
        }
      });
      input.click();
    };

    const uploadFiles = async () => {
      uploadError.value = "";
      uploadBanner.value = "";
      if (files.value.length === 0) {
        uploadBanner.value = "Add files before uploading.";
        return;
      }
      uploading.value = true;
      try {
        const formData = new FormData();
        files.value.forEach((file) => {
          formData.append("uploadedFile", file);
        });
        await client.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        files.value = [];
        await fetchUploadedFiles();
        uploadBanner.value = "Upload complete.";
        setTimeout(() => {
          uploadBanner.value = "";
        }, 3500);
      } catch (err) {
        const msg =
          err.response?.data?.message || err.message || "Upload failed. Please try again.";
        uploadError.value = msg;
      } finally {
        uploading.value = false;
      }
    };

    const formatFileSize = (fileSize) => {
      const units = ["B", "KB", "MB"];
      let i = 0;
      let newSize = fileSize;
      while (newSize > 1024 && i < units.length - 1) {
        newSize /= 1024;
        ++i;
      }
      return `${newSize.toFixed(2)} ${units[i]}`;
    };

    const analyzeFile = (fileId) => {
      router.push({ name: "Analyze", params: { fileId } });
    };

    const deleteUploadedFile = async (fileId) => {
      uploadError.value = "";
      deletingId.value = fileId;
      try {
        await client.delete(`/delete/${fileId}`);
        await fetchUploadedFiles();
      } catch (error) {
        uploadError.value = "Could not delete the file.";
        console.error(error);
      } finally {
        deletingId.value = null;
      }
    };

    return {
      files,
      uploadedFiles,
      handleDrop,
      removeFile,
      openFileDialog,
      formatFileSize,
      uploadFiles,
      analyzeFile,
      deleteUploadedFile,
      uploading,
      uploadError,
      uploadBanner,
      isDragOver,
      onDragEnter,
      onDragLeave,
      deletingId,
      fileKey,
    };
  },
};
</script>

<style scoped>
.file-upload-container {
  margin-top: var(--space-lg);
  padding: 0 var(--space-md);
}

.drop-zone {
  padding: var(--space-xl);
  min-height: 220px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed var(--color-border);
  background: var(--color-surface);
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.drop-zone--active {
  border-color: var(--color-primary);
  background: rgba(222, 145, 81, 0.08);
  box-shadow: var(--shadow-md);
}

.drop-zone__icon {
  font-size: 3rem;
  color: var(--color-primary);
}

.drop-zone__title {
  margin: var(--space-sm) 0 0;
  font-size: 1.25rem;
}

.drop-zone__or {
  margin: var(--space-xs) 0;
  color: var(--color-muted);
}

.drop-zone__browse {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.link-button {
  background: none;
  border: none;
  padding: 0;
  color: var(--color-primary);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

.link-button:hover {
  color: var(--color-primary-hover);
}

.file-container {
  width: 100%;
  max-width: 720px;
  margin: var(--space-lg) auto;
}

@media (min-width: 900px) {
  .file-container {
    max-width: 820px;
  }
}

.section-title {
  font-size: 1.1rem;
  margin: var(--space-lg) 0 var(--space-sm);
}

.banner {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  margin-bottom: var(--space-md);
}

.banner--info {
  background: rgba(222, 145, 81, 0.15);
  color: var(--color-text);
}

.banner--error {
  background: rgba(197, 48, 48, 0.12);
  color: var(--color-danger);
}

.file-list {
  margin: 0;
  list-style: none;
  padding: var(--space-md);
}

.file-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--color-border);
}

.file-list li:last-of-type {
  border-bottom: none;
}

.file-list__name {
  word-break: break-word;
}

.upload-actions {
  justify-content: flex-end;
  padding-top: var(--space-md);
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xs);
  border: none;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  border-radius: var(--radius-sm);
}

.icon-btn:hover {
  color: var(--color-danger);
  background: rgba(0, 0, 0, 0.04);
}

.uploaded-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.uploaded-list__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border);
}

.uploaded-list__row:last-child {
  border-bottom: none;
}

.uploaded-list__name {
  word-break: break-word;
  flex: 1;
  min-width: 0;
}

.uploaded-list__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  align-items: center;
}

.btn-primary--sm,
.btn-danger--sm {
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
}

.btn-danger--sm .material-symbols-outlined {
  font-size: 1.15rem;
}

.empty-hint {
  color: var(--color-muted);
  font-size: 0.95rem;
  margin: var(--space-md) 0;
}

@media (max-width: 480px) {
  .drop-zone {
    min-height: 160px;
    padding: var(--space-md);
  }

  .uploaded-list__row {
    flex-direction: column;
    align-items: stretch;
  }

  .uploaded-list__actions {
    justify-content: flex-start;
  }
}
</style>
