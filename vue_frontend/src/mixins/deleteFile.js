import { client } from "../api/client.js";

export default {
  data() {
    return {};
  },
  methods: {
    async deleteFile(fileID) {
      try {
        await client.delete(`/delete/${fileID}`);
      } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
      }
    },
  },
};
