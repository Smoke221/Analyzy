import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Container from "./components/Container.vue";
import SignupLogin from "./components/Signup-Login.vue";
import Analyze from "./components/Analyze.vue";
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
    name: "Container",
    component: Container,
  },
  {
    path: "/getAnalyzed",
    name: "Analyze",
    component: Analyze,
    meta: { hideComponent: true },
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
