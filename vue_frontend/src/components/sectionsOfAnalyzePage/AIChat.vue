<template>
    <div class="chat-container">
        <div class="chat-box">
            <div v-for="(message, index) in chatHistory" :key="index" class="message">
                <p v-if="message.from === 'user'" class="user-message">{{ message.content }}</p>
                <p v-else class="ai-message">{{ message.content }}</p>
            </div>
        </div>
        <div class="input-wrapper">
            <input v-model="userInput" placeholder="Type your message..." class="input-box">
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
    data() {
        return {
            userInput: '',
            chatHistory: [],
            geminiResponse: ''
        }
    },
    methods: {
        async hitRoute() {
            try {

                this.chatHistory.push({ from: 'user', content: this.userInput })

                const question = { message: this.userInput }
                const response = await axios.post(`http://localhost:3000/chat/${this.fileId}`, question, { withCredentials: true })
                this.geminiResponse = response.data

                this.chatHistory.push({ from: 'ai', content: this.geminiResponse })

            } catch (err) {
                console.error('Error sending message:', err)
            }
            this.userInput = ''
        },
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
    border: 1px solid yellow;
    padding: 10px;
}

.message {
    margin: 5px;
    display: flex;
}

.user-message {
    margin-left: auto;
    background-color: lightcyan;
}

.ai-message {
    margin-right: auto;
    background-color: rgb(162, 247, 162);
}

.user-message,
.ai-message {
    padding: 5px;
    border-radius: 10px;
    border-bottom: 1px solid #ddd;
    width: 80%;
    max-width: fit-content;
    word-wrap: break-word;
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