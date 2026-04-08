<template>
  <div class="pdf-frame card">
    <iframe
      v-if="fileURL"
      :src="fileURL"
      title="Document preview"
      class="pdf-frame__iframe"
    />
    <p v-else class="pdf-frame__empty">Loading document…</p>
  </div>
</template>

<script>
import { store } from "../../vuex/store.js";

export default {
  computed: {
    fileURL() {
      return store.state.fileURL;
    },
  },
};
</script>

<style scoped>
.pdf-frame {
  padding: 0;
  overflow: hidden;
  min-height: min(70vh, 900px);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pdf-frame__iframe {
  width: 100%;
  flex: 1;
  min-height: min(70vh, 900px);
  border: none;
  border-radius: var(--radius-md);
}

.pdf-frame__empty {
  margin: 0;
  padding: var(--space-xl);
  text-align: center;
  color: var(--color-muted);
  font-size: 0.9rem;
}

@media (max-width: 900px) {
  .pdf-frame {
    min-height: 55vh;
  }

  .pdf-frame__iframe {
    min-height: 55vh;
  }
}
</style>
