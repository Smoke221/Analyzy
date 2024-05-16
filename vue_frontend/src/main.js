import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Analyzy from "./components/Analyzy.vue";
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
];

const router = createRouter({ history: createWebHistory(), routes });

const app = createApp(App);
app.use(router);
app.mount("#app");

export default router;