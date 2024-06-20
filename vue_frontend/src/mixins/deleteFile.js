import axios from 'axios';

export default {
  data() {
    return {};
  },
  methods: {
    async deleteFile(fileID) {
      try {
        const response = await axios.delete(
          `https://analyzy.el.r.appspot.com/delete/${fileID}`
        );
        console.log('File deleted.');
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    },
  },
};
