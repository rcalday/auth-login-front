<template>
	<div class="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
		<div class="card shadow p-4" style="width: 100%; max-width: 400px">
			<h4 class="text-center mb-4">Login</h4>
			<form @submit.prevent="handleLogin">
				<div class="mb-3">
					<label for="email" class="form-label">Email address</label>
					<input v-model="email" type="email" class="form-control" id="email" required />
				</div>

				<div class="mb-3">
					<label for="password" class="form-label">Password</label>
					<input v-model="password" type="password" class="form-control" id="password" required />
				</div>

				<button type="submit" class="btn btn-primary w-100" :disabled="loading">
					{{ loading ? "Logging in..." : "Login" }}
				</button>

				<div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
				<div class="d-flex justify-content-center pt-4">
					<div class="row">
						<div class="col-12 py-2 d-flex justify-content-center">
							<router-link to="/register"> <small>Forgot Password?</small> </router-link>
						</div>
						<div class="col-12 py-2 d-flex justify-content-center">
							<router-link to="/register"> <small>Don't have an account?</small> </router-link>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../auth.js";

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const router = useRouter();

const handleLogin = async () => {
	loading.value = true;
	error.value = "";
	try {
		await login(email.value, password.value);

		// Redirect to dashboard on success
		router.push("/dashboard");
	} catch (err) {
		error.value = "Login failed. Please check your credentials.";
	} finally {
		loading.value = false;
	}
};
</script>

<style scoped>
body {
	margin: 0;
}
</style>
