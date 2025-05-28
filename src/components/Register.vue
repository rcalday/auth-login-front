<template>
	<div class="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
		<div class="card shadow p-4" style="width: 100%; max-width: 400px">
			<h4 class="text-center mb-4">Register</h4>
			<form autocomplete="new-password" @submit.prevent="handleRegister">
				<div v-if="error.length" class="alert alert-danger mt-3">
					<ul class="mb-0">
						<li v-for="(errMsg, index) in error" :key="index">{{ errMsg }}</li>
					</ul>
				</div>
				<div class="mb-3">
					<label for="name" class="form-label">Name</label>
					<input v-model="name" type="text" class="form-control" id="name" required />
				</div>
				<div class="mb-3">
					<label for="email" class="form-label">Email address</label>
					<input v-model="email" type="email" class="form-control" id="email" required />
				</div>

				<div class="mb-3">
					<label for="password" class="form-label">Password</label>
					<input v-model="password" type="password" class="form-control" id="password" required />
				</div>

				<div class="mb-3">
					<label for="confirm_password" class="form-label">Confirm Password</label>
					<input v-model="confirm_password" type="password" class="form-control" id="confirm_password" required />
				</div>

				<button type="submit" class="btn btn-primary w-100" :disabled="loading">
					{{ loading ? "Registering..." : "Register" }}
				</button>
				<div class="d-flex justify-content-center pt-4">
					<div class="row">
						<div class="col-12 d-flex justify-content-center">
							<router-link to="/login"> <small>Back to Login</small> </router-link>
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
import { register } from "../auth.js";

const email = ref("");
const name = ref("");
const password = ref("");
const confirm_password = ref("");
const loading = ref(false);
const error = ref([]);
const router = useRouter();

const handleRegister = async () => {
	loading.value = true;
	error.value = [];
	try {
		await register(name.value, email.value, password.value, confirm_password.value);

		// Redirect to dashboard on success
		router.push("/dashboard");
	} catch (err) {
		if (err.response?.data?.errors) {
			error.value = Object.values(err.response.data.errors).flat();
		} else {
			error.value = ["Registration failed. Please try again."];
		}
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
