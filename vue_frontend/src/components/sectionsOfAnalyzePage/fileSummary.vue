<template>
    <div>
        <h4>{{ fileName }}</h4>
        <p>{{ analyzedText }}</p>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from "../../vuex/store";
axios.defaults.withCredentials = true;

export default {
    data() {
        return {
            fileName: '',
            fileURL: '',
            analyzedText: ''
        };
    },
    mounted() {
        this.fetchFileDetails();
    },
    methods: {
        async fetchFileDetails() {
            try {
                const fileId = this.$route.params.fileId;
                store.commit('setFileId', fileId)
                const response = await axios.get(`http://localhost:3000/analyz/${fileId}`)
                if (response.status === 200) {
                    const data = response.data;
                    this.fileName = data.isFileExists.fileName;
                    this.fileURL = data.isFileExists.fileURL;
                    this.analyzedText = data.result;

                    //Storing variables in vuex store to access from other components.
                    store.commit('setFileURL', this.fileURL);

                } else {
                    console.error('Error fetching files:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        },
    },
};
</script>
<style scoped></style>
