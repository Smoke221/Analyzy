import { createApp } from "vue";
import { createRouter } from "vue-router";
import "./style.css";
import App from "./App.vue";

const router = createRouter({});

const app = createApp(App);
app.use(router);
app.mount("#app");
