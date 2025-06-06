// src/router.js
import { createRouter, createWebHashHistory } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Dashboard from "./components/Dashboard.vue";

const routes = [
	{ path: "/", redirect: "/login" },
	{ path: "/login", component: Login },
	{ path: "/register", component: Register },
	{ path: "/dashboard", component: Dashboard },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
