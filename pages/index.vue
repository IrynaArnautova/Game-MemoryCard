<template>
	<section class="cards">
		<h1 class="cards_title">
			Memory Game
			<NuxtImg
				src="/cat-title.png"
				class="cards_title-img"
				alt=""
			/>
		</h1>
		<CardBoard/>
	</section>
</template>

<script setup>
    import CardBoard from '@/components/CardBoard';
</script>

<style scoped>
	.cards {
		background: #242425;
		min-height: 100vh;
		padding: 60px 0 0;
	}
	.cards_title {
		text-align: center;
		margin: 0 auto 40px;
		font: 900 52px/62px 'Outfit', sans-serif;
		color: #d8f19e;
		position: relative;
		width: fit-content;
	}
	.cards_title-img {
		position: absolute;
		width: 100px;
		top: -36px;
		right: 0;
	}
</style>
