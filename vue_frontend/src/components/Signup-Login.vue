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
                <div class="checkbox-container">
                    <input type="checkbox" id="remember-me">
                    <label for="remember-me">Remember me</label>
                </div>
                <button type="submit">Login</button>
                <a href="">Forgot Password?</a>
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
    <div class="google-login">
        <button @click="handleGoogleLogin">Login with Google</button>
    </div>
    <MessageCard ref="messageCard" />

</template>

<script>
import axios from 'axios';
import MessageCard from '../components/MessageCard.vue'

export default {
    data() {
        return {
            isLoginForm: true,
            username: '',
            email: '',
            password: '',
        };
    },
    components: {
        MessageCard,
    },
    methods: {
        showMessage(message, destination) {
            this.$refs.messageCard.showMessage(message, destination);
        },
        toggleForm() {
            this.isLoginForm = !this.isLoginForm;
        },
        async handleLogin() {
            try {
                const payload = JSON.stringify({ email: this.email, password: this.password });
                const response = await fetch("http://localhost:3000/auth/login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: payload,
                });

                if (!response.ok) {
                    let errorMessage = 'An error occurred while logging in.';
                    if (response.status === 401) {
                        errorMessage = 'Wrong password';
                        this.password = ''
                    } else if (response.status === 500) {
                        errorMessage = 'Internal server error';
                    }
                    throw new Error(errorMessage);
                }
                const { userName } = await response.json()
                sessionStorage.setItem("userName", userName)
                this.showMessage("Login successful!");
            } catch (err) {
                console.error('Error logging in:', err.message);
                this.showMessage(err.message);
            }
        },

        async handleSignup() {
            try {
                const payload = JSON.stringify({ name: this.username, email: this.email, password: this.password });
                const response = await fetch("http://localhost:3000/auth/signup", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: payload,
                });

                if (!response.ok) {
                    let errorMessage = 'An error occurred while signing up.';
                    if (response.status === 400) {
                        errorMessage = 'User already exists. Please log in.';
                        this.username = ''
                        this.email = ''
                        this.password = ''
                    } else if (response.status === 500) {
                        errorMessage = 'Internal server error';
                    }
                    throw new Error(errorMessage);
                }
                this.showMessage("Signup successful!");
            } catch (err) {
                console.error('Error signing up:', err.message);
                this.showMessage(err.message);
            }
        },

        handleGoogleLogin() {
            window.location.href = "http://localhost:3000/auth/google";
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
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    width: 70%;
    max-width: 900px;
    overflow: hidden;
    padding: 30px;
    flex-wrap: wrap;
    margin-top: 10vw;
}

.info {
    flex: 1;
    padding: 40px;
    background: #2E2E3A;
    /* color: #fff; */
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.info h2 {
    font-size: 4vw;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0;
}

.info a {
    color: #fff;
    text-decoration: none;
}

.info p {
    font-size: 1vw;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 2px;
    white-space: 4px;
    margin-top: 1.5vw;
    color: #DE9151;
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
    background: #DE9151;
    color: #fff;
    cursor: pointer;
    margin-bottom: 10px;
}

.form button:hover {
    background: #c27e46;
}

.checkbox-container {
    margin-bottom: 5px;
}

.checkbox-container input {
    margin-right: 5px;
}

.google-login {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.google-login button {
    padding: 12px 16px 12px 42px;
    border: none;
    border-radius: 3px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
    color: #757575;
    font-size: 14px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
    background-color: white;
    background-repeat: no-repeat;
    background-position: 15px 15px;
}

.google-login button:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25);
}
</style>