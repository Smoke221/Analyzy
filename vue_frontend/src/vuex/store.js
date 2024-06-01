import { createStore } from "vuex";

const store = createStore({
  state: {
    fileURL: "",
  },
  mutations: {
    setFileURL(state, fileURL) {
      state.fileURL = fileURL;
    },
    setFileId(state, fileId){
      state.fileId = fileId
    }
  },
});

export { store };
