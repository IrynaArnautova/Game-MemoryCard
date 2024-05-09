<template>
	<div class="cards_inner">
		<Card
			v-for="(card, index) in cardList"
			:key="`card-${index}`"
			:value="card.value"
			:position="card.position"
			:visible="card.visible"
			@select-card="flipCard"
		/>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
    import Card from '@/components/Card';

    const cardList = ref([]);
    for (let i = 0; i < 16; i++) {
         cardList.value.push({
			 value: i,
			 visible: false,
			 position: i
		 });
	}

    const flipCard = payload => {
        cardList.value[payload.position].visible = true;
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
