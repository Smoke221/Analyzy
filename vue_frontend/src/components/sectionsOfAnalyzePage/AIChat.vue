<template>
  <div class="chat-container card">
    <div ref="chatBoxRef" class="chat-box">
      <div v-for="(message, index) in displayMessages" :key="index" class="message-row">
        <p
          v-if="message.from === 'user'"
          class="bubble bubble--user"
        >
          {{ message.content }}
        </p>
        <p
          v-else-if="message.from === 'ai'"
          class="bubble bubble--ai"
        >
          {{ message.content }}
        </p>
        <p v-else class="bubble bubble--system">{{ message.content }}</p>
      </div>
      <p v-if="loading" class="bubble bubble--ai bubble--typing">Thinking…</p>
    </div>
    <div class="chips" role="group" aria-label="Suggested questions">
      <button
        v-for="chip in chips"
        :key="chip.q"
        type="button"
        class="chip"
        :disabled="loading"
        @click="sendPredefinedQuestion(chip.q)"
      >
        {{ chip.label }}
      </button>
    </div>
    <div class="input-row">
      <textarea
        v-model="userInput"
        class="input-box"
        placeholder="Type a question… (Enter to send, Shift+Enter for newline)"
        rows="2"
        :disabled="loading"
        @keydown="onKeydown"
      />
      <button
        type="button"
        class="btn-primary send-btn"
        :disabled="loading || !trimmedInput"
        @click="sendUserMessage"
      >
        <span class="material-symbols-outlined" aria-hidden="true">send</span>
        Send
      </button>
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
import { mapState } from "vuex";
import { client } from "../../api/client.js";

export default {
  computed: {
    ...mapState(["chatHistory"]),
    fileId() {
      return this.$store.state.fileId;
    },
    trimmedInput() {
      return this.userInput.trim();
    },
    displayMessages() {
      const rows = (this.chatHistory || []).map((m) => ({
        from: m.role === "user" ? "user" : "ai",
        content: m.content,
      }));
      if (this.pendingUserText) {
        rows.push({ from: "user", content: this.pendingUserText });
      }
      return [...rows, ...this.transientErrors];
    },
  },
  data() {
    return {
      userInput: "",
      pendingUserText: "",
      transientErrors: [],
      loading: false,
      chips: [
        { label: "Main idea?", q: "What is the main idea of the document?" },
        { label: "Purpose?", q: "What is the purpose of this document?" },
        { label: "Author?", q: "Who is the author?" },
        { label: "Bias?", q: "Is there any bias in this document?" },
      ],
    };
  },
  methods: {
    clearTransientErrors() {
      this.transientErrors = [];
    },
    async scrollToBottom() {
      await nextTick();
      const el = this.$refs.chatBoxRef;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    },
    onKeydown(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendUserMessage();
      }
    },
    async sendPredefinedQuestion(question) {
      if (this.loading || !this.fileId) return;
      this.clearTransientErrors();
      this.pendingUserText = question;
      await this.scrollToBottom();
      this.loading = true;
      try {
        const { data } = await client.post(`/chat/${this.fileId}`, { message: question });
        this.$store.commit("appendChatExchange", {
          userText: question,
          assistantText: typeof data === "string" ? data : String(data),
        });
        this.pendingUserText = "";
      } catch (err) {
        this.pendingUserText = "";
        this.transientErrors.push({
          from: "system",
          content: "Something went wrong. Please try again.",
        });
        console.error(err);
      } finally {
        this.loading = false;
        await this.scrollToBottom();
      }
    },
    async sendUserMessage() {
      const text = this.trimmedInput;
      if (!text || this.loading || !this.fileId) return;
      this.clearTransientErrors();
      this.pendingUserText = text;
      this.userInput = "";
      await this.scrollToBottom();
      this.loading = true;
      try {
        const { data } = await client.post(`/chat/${this.fileId}`, { message: text });
        this.$store.commit("appendChatExchange", {
          userText: text,
          assistantText: typeof data === "string" ? data : String(data),
        });
        this.pendingUserText = "";
      } catch (err) {
        this.pendingUserText = "";
        this.transientErrors.push({
          from: "system",
          content: "Could not get a response. Check your connection and try again.",
        });
        console.error(err);
      } finally {
        this.loading = false;
        await this.scrollToBottom();
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  margin-top: 0;
  padding: var(--space-md);
  gap: var(--space-md);
}

.chat-box {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-md);
  max-height: min(40vh, 320px);
  min-height: 160px;
  background: var(--color-bg);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.message-row {
  display: flex;
  margin-bottom: var(--space-sm);
}

.bubble {
  margin: 0;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  line-height: 1.45;
  max-width: 88%;
  word-wrap: break-word;
}

.bubble--user {
  margin-left: auto;
  background: rgba(222, 145, 81, 0.2);
  border: 1px solid rgba(222, 145, 81, 0.45);
  color: var(--color-text);
}

.bubble--ai {
  margin-right: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.bubble--system {
  margin-right: auto;
  background: rgba(197, 48, 48, 0.08);
  border: 1px solid rgba(197, 48, 48, 0.25);
  color: var(--color-danger);
  font-size: 0.82rem;
}

.bubble--typing {
  font-style: italic;
  color: var(--color-muted);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.chip {
  padding: 0.35rem 0.65rem;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.chip:hover:not(:disabled) {
  border-color: var(--color-primary);
  background: rgba(222, 145, 81, 0.08);
}

.chip:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  align-items: flex-end;
}

.input-box {
  flex: 1;
  min-width: 180px;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
}

.send-btn .material-symbols-outlined {
  font-size: 1.1rem;
}
</style>
