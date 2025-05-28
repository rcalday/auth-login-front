<!-- src/components/Dashboard.vue -->
<template>
	<div v-if="user">
		<h2>Welcome, {{ user.name }}</h2>
		<p>Email: {{ user.email }}</p>
	</div>
	<p v-else>Loading user info...</p>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCurrentUser } from "../auth.js";

const user = ref(null);

onMounted(async () => {
	try {
		const fetchedUser = await getCurrentUser();
		user.value = fetchedUser || null; // Handle null case safely
	} catch (err) {
		console.error("Failed to fetch user:", err);
		user.value = null; // Ensure fallback state
	}
});
</script>
