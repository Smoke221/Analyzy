<template>
    <div class="container">
        <div class="info">
            <h2><router-link to="/">Analyzy</router-link></h2>
            <p>Your go to document assistant.</p>
        </div>
        <div class="form-container">
            <form v-if="isLoginForm" @submit.prevent="handleLogin" class="form">
                <h2>Login</h2>
                <input v-model="email" type="email" placeholder="Email" required>
                <input v-model="password" type="password" placeholder="Password" required>
                <button type="submit">Login</button>
                <button type="button" @click="toggleForm">I'm new</button>
            </form>
            <form v-else @submit.prevent="handleSignup" class="form">
                <h2>Signup</h2>
                <input v-model="username" type="text" placeholder="Username" required>
                <input v-model="email" type="email" placeholder="Email" required>
                <input v-model="password" type="password" placeholder="Password" required>
                <button type="submit">Signup</button>
                <button type="button" @click="toggleForm">I have an account</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoginForm: true,
            username: '',
            email: '',
            password: '',
        };
    },
    methods: {
        toggleForm() {
            this.isLoginForm = !this.isLoginForm;
        },
        handleLogin() {
            // Handle login logic
            console.log('Logging in with', this.email, this.password);
        },
        handleSignup() {
            // Handle signup logic
            console.log('Signing up with', this.username, this.email, this.password);
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: stretch;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 70%;
    max-width: 900px;
    overflow: hidden;
    padding: 30px;
    position: absolute;
    top: 15%;
    left: 25%;
    flex-wrap: wrap;
}

.info {
    flex: 1;
    padding: 40px;
    background: #1d1d1dbf;
    color: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.info h2 {
    font-size: 70px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0;
}

.info a {
    color: #fff;
    text-decoration: none;
}

.info p {
    font-size: 15px;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 2px;
    white-space: 4px;
}

.form-container {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
}

.form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.form h2 {
    margin-bottom: 20px;
}

.form input {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: #55ACEE;
    color: #fff;
    cursor: pointer;
    margin-bottom: 10px;
}

.form button:hover {
    background: #3498db;
}
</style>