import { createStore } from "vuex";

const store = createStore({
  state: {
    fileURL: "",
    fileId: null,
    chatHistory: [],
  },
  mutations: {
    setFileURL(state, fileURL) {
      state.fileURL = fileURL;
    },
    setFileId(state, fileId) {
      if (state.fileId !== fileId) {
        state.chatHistory = [];
      }
      state.fileId = fileId;
    },
    setChatHistory(state, messages) {
      state.chatHistory = Array.isArray(messages) ? [...messages] : [];
    },
    appendChatExchange(state, { userText, assistantText }) {
      const now = new Date().toISOString();
      state.chatHistory = [
        ...state.chatHistory,
        { role: "user", content: userText, createdAt: now },
        { role: "assistant", content: assistantText, createdAt: now },
      ];
    },
  },
});

export { store };
