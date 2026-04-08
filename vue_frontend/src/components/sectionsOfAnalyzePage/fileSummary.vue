<template>
  <div class="summary card">
    <div v-if="error" class="summary__error">
      <p>{{ error }}</p>
      <button type="button" class="btn-primary" @click="fetchFileDetails">Retry</button>
    </div>
    <template v-else>
      <div v-if="analyzedText" class="summary__toolbar">
        <p v-if="fromCache" class="summary__badge">Saved analysis</p>
        <button type="button" class="btn-ghost summary__refresh" @click="refreshAnalysis">
          Regenerate analysis
        </button>
      </div>
      <div v-if="analyzedText" class="analysis-report prose" v-html="safeHtml"></div>
      <div v-else class="summary__loading">
        <p class="loader" aria-hidden="true"></p>
        <span class="summary__loading-text">Analyzing document…</span>
      </div>
    </template>
  </div>
</template>

<script>
import DOMPurify from "dompurify";
import { store } from "../../vuex/store";
import { client } from "../../api/client.js";

export default {
  data() {
    return {
      fileName: "",
      fileURL: "",
      analyzedText: "",
      error: "",
      fromCache: false,
      refreshing: false,
    };
  },
  computed: {
    safeHtml() {
      if (!this.analyzedText) return "";
      return DOMPurify.sanitize(this.analyzedText);
    },
  },
  mounted() {
    this.fetchFileDetails();
  },
  methods: {
    async fetchFileDetails(options = {}) {
      const forceRefresh = options.forceRefresh === true;
      this.error = "";
      if (!forceRefresh) {
        this.analyzedText = "";
      }
      const fileId = this.$route.params.fileId;
      store.commit("setFileId", fileId);
      try {
        const url = forceRefresh ? `/analyz/${fileId}?refresh=1` : `/analyz/${fileId}`;
        const { data, status } = await client.get(url);
        if (status === 200 && data.isFileExists) {
          this.fileName = data.isFileExists.fileName;
          this.fileURL = data.isFileExists.fileURL;
          this.analyzedText = typeof data.result === "string" ? data.result.trim() : "";
          this.fromCache = Boolean(data.fromCache);
          store.commit("setFileURL", this.fileURL);
          store.commit("setChatHistory", data.chatHistory || []);
        } else {
          this.error = "Could not load this file.";
        }
      } catch (e) {
        if (e.response?.status === 403) {
          this.error = "You do not have access to this document.";
        } else {
          this.error =
            e.response?.data?.message || "Failed to load analysis. Please try again.";
        }
        console.error(e);
      }
    },
    async refreshAnalysis() {
      if (this.refreshing) return;
      this.refreshing = true;
      this.analyzedText = "";
      try {
        await this.fetchFileDetails({ forceRefresh: true });
      } finally {
        this.refreshing = false;
      }
    },
  },
};
</script>

<style scoped>
.summary {
  padding: var(--space-md);
  min-height: 200px;
}

.summary__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.summary__badge {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-muted);
}

.summary__refresh {
  font-size: 0.8rem;
}

.summary__error {
  text-align: center;
  padding: var(--space-lg);
  color: var(--color-danger);
}

.summary__error p {
  margin: 0 0 var(--space-md);
}

.summary__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  min-height: 180px;
  padding: var(--space-xl);
}

.summary__loading-text {
  font-size: 0.9rem;
  color: var(--color-muted);
}

.loader {
  width: 2.5rem;
  height: 2.5rem;
  border: 4px solid var(--color-border);
  border-bottom-color: var(--color-primary);
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  to {
    transform: rotate(360deg);
  }
}

.prose {
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--color-text);
  max-width: 52ch;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5) {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.prose :deep(p) {
  margin: 0 0 0.75rem;
}

.prose :deep(ul) {
  margin: 0 0 0.75rem;
  padding-left: 1.25rem;
}
</style>
