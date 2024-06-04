<template>
    <div class="container">
        <div v-if="analyzedText" class="analysis-report">
            <div v-html="analyzedText"></div>
        </div>
        <p class="loader" v-else></p>
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
    background-color: rgb(255, 239, 231);
    border-radius: 5px;
    font-size: 0.95rem;
    box-shadow: rgb(230, 230, 230) 0px 0px 0px 2px, rgb(202, 202, 202) 0px 0px 0px 4px;
}

.loader {
    width: 2.5rem;
    height: 2.5rem;
    border: 5px solid #FFF;
    border-bottom-color: #ff0059;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
