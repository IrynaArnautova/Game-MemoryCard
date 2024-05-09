<template>
	<section class="cards">
		<h1 class="cards_title">Memory Game</h1>
		<CardBoard/>
	</section>
</template>

<script setup>
    import CardBoard from '@/components/CardBoard';
</script>

<style scoped>
	.cards_title {
		text-align: center;
		margin: 0 0 40px;
	}
</style>
