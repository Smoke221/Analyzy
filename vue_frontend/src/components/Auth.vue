<template>
  <div class="auth-page">
    <div class="card">
      <div class="card-brand">
        <h2><router-link to="/">Analyzy</router-link></h2>
        <p class="tagline">Your document assistant</p>
      </div>
      <div class="card-body">
        <h3 class="title">Continue your way</h3>
        <p class="lead">
          Sign-in is optional. You can upload and analyze PDFs as a guest, or sign in with Google
          to tie files to your account when that flow is enabled on the server.
        </p>
        <p v-if="googleError" class="error" role="alert">
          Google sign-in did not complete. Please try again.
        </p>
        <button type="button" class="btn-primary" @click="continueAsGuest">
          Continue without signing in
        </button>
        <button type="button" class="btn-google" @click="signInWithGoogle">
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getApiBaseUrl } from "../apiBase.js";

export default {
  name: "Auth",
  computed: {
    googleError() {
      return this.$route.query.error === "google";
    },
  },
  methods: {
    continueAsGuest() {
      this.$router.push("/analyzy");
    },
    signInWithGoogle() {
      window.location.href = `${getApiBaseUrl()}/auth/google`;
    },
  },
};
</script>

<style scoped>
.auth-page {
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
}

.card {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 900px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px;
  border-radius: 8px;
  overflow: hidden;
}

.card-brand {
  flex: 1;
  min-width: 260px;
  padding: 2.5rem;
  background: #2e2e3a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.card-brand h2 {
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
}

.card-brand a {
  color: #fff;
  text-decoration: none;
}

.tagline {
  margin-top: 1rem;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #de9151;
}

.card-body {
  flex: 1;
  min-width: 260px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

.title {
  margin: 0;
  font-size: 1.35rem;
  color: #2e2e3a;
}

.lead {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: #444;
}

.error {
  margin: 0;
  padding: 0.65rem 0.75rem;
  background: #fde8e8;
  color: #9b1c1c;
  border-radius: 6px;
  font-size: 0.9rem;
}

.btn-primary,
.btn-google {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: #de9151;
  color: #fff;
}

.btn-primary:hover {
  background: #c27e46;
}

.btn-google {
  background: #fff;
  color: #5f6368;
  border: 1px solid #dadce0;
  box-shadow: rgba(0, 0, 0, 0.05) 0 1px 2px;
}

.btn-google:hover {
  box-shadow: rgba(0, 0, 0, 0.12) 0 2px 6px;
}
</style>
