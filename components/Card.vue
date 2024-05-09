<template>
	<div class="card">
		{{value}}
	</div>
</template>

<script setup>
	const props = defineProps ({
		value: {
		    type: Number,
			required: true
		}
	})
</script>

<style scoped>
	.card {
		border: medium solid #021550;
	}
</style>
