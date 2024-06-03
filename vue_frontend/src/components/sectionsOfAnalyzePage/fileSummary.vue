<template>
    <div class="container">
        <div  v-if="analyzedText" class="analysis-report">
            <div v-html="analyzedText"></div>
        </div>
        <p v-else>Loading analysis...</p>
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
                    this.analyzedText = data.result.trim()

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
<style scoped>
.container {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border-radius: 5px;
}
</style>
