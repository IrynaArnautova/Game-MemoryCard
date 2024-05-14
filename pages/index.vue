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
		padding: 60rem 0;
	}
	.cards_title {
		text-align: center;
		margin: 0 auto 40rem;
		font: 900 52rem/62rem 'Outfit', sans-serif;
		color: #d8f19e;
		position: relative;
		width: fit-content;
	}
	.cards_title-img {
		position: absolute;
		width: 100rem;
		top: -36rem;
		right: 0;
	}
	@media(max-width: 991px) {
		.cards_title {
			font: 900 44rem/46rem 'Outfit', sans-serif;
		}
		.cards_title-img {
			top: -42rem;
		}
	}
</style>
