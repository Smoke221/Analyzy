<template>
    <div v-if="visible" id="message-card" class="message-card">
        <span class="close-button" @click="closeMessage">&times;</span>
        <p id="message-text">{{ message }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            message: '',
            destination: null,
        };
    },
    methods: {
        showMessage(message, destination = null) {
            this.message = message;
            this.destination = destination;
            this.visible = true;

            setTimeout(() => {
                this.visible = false;
                if (this.destination) {
                    this.$router.push(this.destination);
                }
            }, 2000);
        },
        closeMessage() {
            this.visible = false;
            if (this.destination) {
                this.$router.push(this.destination);
            }
        },
    },
};
</script>

<style scoped>
.message-card {
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: #faa640e6;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 20px 30px;
    text-align: center;
    border-radius: 10px;
    z-index: 1000;
    max-width: 350px;
}

#message-text {
    font-size: 30px;
    color: #333333;
    position: relative;
    top: 10px;
}

.close-button {
    position: absolute;
    top: 0;
    right: 10px;
    cursor: pointer;
    font-size: 1.5rem;
    color: #000000;
    background: none;
    border: none;
    outline: none;
}

.close-button:hover {
    color: #ff0000;
}
</style>
