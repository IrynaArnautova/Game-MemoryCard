<template>
	<div>
		<div class="cards_inner">
			<Card
					v-for="(card, index) in cardList"
					:key="`card-${index}`"
					:value="card.value"
					:matched="card.matched"
					:position="card.position"
					:visible="card.visible"
					@select-card="flipCard"
			/>
		</div>
		<p>{{ status }}</p>
		<button @click="shuffleCards">Shuffle</button>
		<button @click="restartGame">Restart</button>
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
        cardList.value.filter(card => card.matched = false).length;
        return remainingPairs / 2;
	})
	const restartGame = () => {
        shuffleCards();
        cardList.value = cardList.value.map((card, index) => ({
            ...card,
			matched: false,
			visible: false,
			position: index
		}))
	}

	const shuffleCards = () => {
        cardList.value = _.shuffle(cardList.value)
	}

	const cardItems = [1, 2, 3, 4, 5, 6, 7, 8];

    cardItems.forEach(item => {
        cardList.value.push({
            value: item,
            visible: false,
            position: null,
            matched: false
        });
        cardList.value.push({
            value: item,
            visible: false,
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
            userSelection.value[1] = payload
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
		grid-template-columns: 100px 100px 100px 100px;
		grid-template-rows: 100px 100px 100px 100px;
		gap: 20px;
		justify-content: center;
	}
</style>
