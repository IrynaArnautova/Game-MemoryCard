<template>
	<div>
		<transition-group tag="section" class="cards_inner" name="shuffle-card">
			<Card
					v-for="(card, index) in cardList"
					:key="`${card.value}-${card.variant}`"
					:value="card.value"
					:matched="card.matched"
					:position="card.position"
					:visible="card.visible"
					@select-card="flipCard"
			/>
		</transition-group>
		<button @click="restartGame" class="cards_button">Restart game</button>
	</div>
</template>

<script setup>
	import { ref, watch, computed } from 'vue';
	import _ from 'lodash';
    import Card from '@/components/Card';

    const cardList = ref([]);
    const userSelection = ref([]);

    const status = computed(() => {
        if(remainingPairs.value.length === 0) {
            return 'Player wins'
		} else {
            return `Remaining pairs: ${remainingPairs.value}`
		}
	})

    const remainingPairs = computed(() => {
        const remainingPairsData = cardList.value.filter(card => card.matched === false).length;
        return remainingPairsData / 2;
	})
	const restartGame = () => {
        cardList.value = _.shuffle(cardList.value)
        cardList.value = cardList.value.map((card, index) => ({
            ...card,
			matched: false,
			visible: false,
			position: index
		}))
	}


	const cardItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    cardItems.forEach(item => {
        cardList.value.push({
            value: item,
            visible: false,
			variant: 1,
            position: null,
            matched: false
        });
        cardList.value.push({
            value: item,
            visible: false,
            variant: 2,
            position: null,
            matched: false
        });
	})

    cardList.value = cardList.value.map((card, index) => ({
        ...card,
        position: index
    }))


    const flipCard = payload => {
        cardList.value[payload.position].visible = true;

        if(userSelection.value[0]) {
            if(userSelection.value[0].position === payload.position && userSelection.value[0].faceValue === payload.faceValue) {
				return
			} else {
                userSelection.value[1] = payload
			}
		} else {
            userSelection.value[0] = payload
		}
	}

    watch(userSelection, currentValue => {
		console.log(currentValue);
		if(currentValue.length === 2) {
		    const cardOne = currentValue[0];
		    const cardTwo = currentValue[1];

		    if(cardOne.faceValue === cardTwo.faceValue) {
				cardList.value[cardOne.position].matched = true
				cardList.value[cardTwo.position].matched = true
			} else {
		        setTimeout(() => {
                    cardList.value[cardOne.position].visible = false;
                    cardList.value[cardTwo.position].visible = false;
				}, 2000)
			}
		    userSelection.value.length = 0;
		}
	},
		{ deep: true })
</script>

<style scoped>
	.cards_inner {
		display: grid;
		grid-template-columns: repeat(6, 120px);
		grid-template-rows: repeat(3, 120px);
		gap: 30px;
		justify-content: center;
		margin: 0 auto 40px;
	}
	.cards_button {
		display: block;
		margin: 0 auto;
		border: thin solid #d8f19e;
		padding: 15px 40px;
		background: #242425;
		border-radius: 5px;
		color: #d8f19e;
		font-size: 20px;
		cursor: pointer;
		transition: all .3s linear;
	}
	.cards_button:hover {
		background: #d8f19e;
		color: #242425;
	}
	.shuffle-card-move {
		transition: transform .8s ease-in;
	}
</style>
