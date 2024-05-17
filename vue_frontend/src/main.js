import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Analyzy from "./components/Analyzy.vue";
import SignupLogin from "./components/Signup-Login.vue";
import "./style.css";
import App from "./App.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/analyzy",
    name: "Analyzy",
    component: Analyzy,
  },
  {
    path: "/auth",
    name: "Signup-Login",
    component: SignupLogin,
    meta: { hideComponent: true },
  },
];

const router = createRouter({ history: createWebHistory(), routes });

const app = createApp(App);
app.use(router);
app.mount("#app");

export default router;
