<template>
    <div>
        <h4>{{ fileName }}</h4>
        <p>{{ analyzedText }}</p>
        <DisplayFile :fileURL="fileURL" />
    </div>
</template>

<script>
import axios from 'axios';
import DisplayFile from './DisplayFile.vue';

axios.defaults.withCredentials = true;

export default {
    data() {
        return {
            fileName: '',
            fileURL: '',
            analyzedText: ''
        };
    },
    components: {
        DisplayFile
    },
    mounted() {
        this.fetchFileDetails();
    },
    methods: {
        async fetchFileDetails() {
            try {
                const fileId = this.$route.params.fileId;
                const response = await axios.get(`http://localhost:3000/analyz/${fileId}`)
                if (response.status === 200) {
                    const data = response.data;
                    this.fileName = data.isFileExists.fileName;
                    this.fileURL = data.isFileExists.fileURL;
                    this.analyzedText = data.result;
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
</style>
