<template>
  <div class="analyze-workspace">
    <header class="analyze-toolbar">
      <router-link to="/analyzy" class="back-link">
        <span class="material-symbols-outlined" aria-hidden="true">arrow_back</span>
        Back to files
      </router-link>
    </header>
    <div class="analyze-grid">
      <section class="analyze-panel analyze-panel--summary" aria-labelledby="summary-heading">
        <h2 id="summary-heading" class="panel-title">Summary</h2>
        <fileSummary />
      </section>
      <section class="analyze-panel analyze-panel--pdf" aria-labelledby="pdf-heading">
        <h2 id="pdf-heading" class="panel-title">Document</h2>
        <displayFile />
      </section>
      <section class="analyze-panel analyze-panel--chat" aria-labelledby="chat-heading">
        <h2 id="chat-heading" class="panel-title">Chat</h2>
        <AIChat />
      </section>
    </div>
  </div>
</template>

<script>
import displayFile from "./sectionsOfAnalyzePage/DisplayFile.vue";
import fileSummary from "./sectionsOfAnalyzePage/fileSummary.vue";
import AIChat from "./sectionsOfAnalyzePage/AIChat.vue";

export default {
  components: {
    displayFile,
    fileSummary,
    AIChat,
  },
};
</script>

<style scoped>
.analyze-workspace {
  min-height: 100vh;
  background: var(--color-bg);
  padding: var(--space-md);
  padding-bottom: var(--space-xl);
}

.analyze-toolbar {
  max-width: 1400px;
  margin: 0 auto var(--space-md);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}

.back-link:hover {
  color: var(--color-primary-hover);
}

.back-link .material-symbols-outlined {
  font-size: 1.25rem;
}

.analyze-grid {
  display: grid;
  gap: var(--space-md);
  max-width: 1400px;
  margin: 0 auto;
  grid-template-columns: 1fr;
  align-items: start;
}

@media (min-width: 901px) {
  .analyze-grid {
    grid-template-columns: minmax(280px, 1fr) minmax(320px, 1.4fr) minmax(280px, 1fr);
    align-items: stretch;
  }

  .analyze-panel--summary {
    max-height: calc(100vh - 5rem);
    overflow-y: auto;
  }

  .analyze-panel--pdf {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .analyze-panel--chat {
    max-height: calc(100vh - 5rem);
    overflow-y: auto;
  }
}

.analyze-panel {
  min-width: 0;
}

.panel-title {
  margin: 0 0 var(--space-sm);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-muted);
}

@media (max-width: 900px) {
  .analyze-grid {
    display: flex;
    flex-direction: column;
  }

  .analyze-panel--summary {
    order: 1;
  }

  .analyze-panel--pdf {
    order: 2;
  }

  .analyze-panel--chat {
    order: 3;
  }
}
</style>
