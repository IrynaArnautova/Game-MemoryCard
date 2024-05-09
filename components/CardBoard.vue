<template>
	<div class="cards_inner">
		<Card
			v-for="(card, index) in cardList"
			:key="`card-${index}`"
			:value="card"/>
	</div>
</template>

<script setup>
    import Card from '@/components/Card';

    const cardList = [];
    for (let i = 0; i < 16; i++) {
         cardList.push(i);
	}
</script>

<style scoped>
	.cards_inner {
		display: grid;
		grid-template-columns: 100px 100px 100px 100px;
		grid-template-rows: 100px 100px 100px 100px;
		gap: 20px;
		justify-content: center;
	}
</style>
