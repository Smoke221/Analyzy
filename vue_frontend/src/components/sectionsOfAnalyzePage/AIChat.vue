<template>
    <div class="chat-container">
        <div class="chat-box">
        </div>
        <div class="input-wrapper">
            <button @click="hitRoute" class="material-symbols-outlined"
                id="send-message-button">arrow_circle_up</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from "../../vuex/store";
axios.defaults.withCredentials = true;

export default {
    computed: {
        fileId() {
            //Get fileId from Vuex store state.
            return store.state.fileId
        }
    },
    methods: {
        async hitRoute() {
            try {
                const question = { message: "What happens if i dont file?" }
                const response = await axios.post(`http://localhost:3000/chat/${this.fileId}`, question, { withCredentials: true })
                console.log(response.data);
            } catch (err) {
                console.error('Error logging in:', err)
            }
        }
    }
};
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
}

.chat-box {
    flex: 1;
    overflow-y: auto;
}

.message {
    margin: 5px;
}

.user-message {
    background-color: lightblue;
    padding: 5px;
    border-radius: 10px;
}

.ai-message {
    background-color: lightgreen;
    padding: 5px;
    border-radius: 10px;
}

.input-wrapper {
    display: flex;
}

.input-box {
    flex: 1;
    margin-top: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

#send-message-button {
    margin-top: 10px;
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}
</style>