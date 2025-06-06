// src/api.js
import axios from "axios";

function getCookie(name) {
	const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
	if (match) return decodeURIComponent(match[2]);
	return null;
}

const api = axios.create({
	baseURL: "https://13.49.64.185",
	// baseURL: "http://localhost:8000",
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	const xsrfToken = getCookie("XSRF-TOKEN");
	if (xsrfToken) {
		config.headers["X-XSRF-TOKEN"] = xsrfToken;
	}
	return config;
});

export default api;
