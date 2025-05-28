// src/auth.js
import api from "./axios";

export async function login(email, password) {
	// First, get the CSRF cookie
	await api.get("api/csrf-cookie");

	// Then, post login credentials
	const res = await api.post("/auth/login", { email, password });

	return res.data;
}

export async function register(name, email, password, confirm_password) {
	// // First, get the CSRF cookie
	await api.get("api/csrf-cookie");

	// Then, post register credentials
	const res = await api
		.post("/auth/register", {
			name: name,
			email: email,
			password: password,
			password_confirmation: confirm_password,
		})
		.then((response) => {
			// User is authenticated
			// console.log("User:", response.data);
			// console.log(response);

			return response.data;
			// Stay on current page or redirect to dashboard
		});

	// return res.data;
}

export async function getCurrentUser() {
	const res = await api.get("/auth/user"); // Sanctum will use session cookie
	return res.data;
}

export async function logout() {
	await api.post("/logout");
}
