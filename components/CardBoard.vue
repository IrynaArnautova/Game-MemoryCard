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
		<p class="cards_status">{{ status }}</p>
		<button v-if="newPlayer" @click="startGame" class="cards_button">Start game</button>
		<button v-else @click="restartGame" class="cards_button">Restart game</button>
	</div>
</template>

<script setup>
	import { ref, watch, computed } from 'vue';
	import _ from 'lodash';
    import Card from '@/components/Card';
    import {launchConfetti} from "@/utilities/confetti";

    const cardList = ref([]);
    const userSelection = ref([]);
    const newPlayer = ref(true);

    const startGame = () => {
        newPlayer.value = false;
        restartGame();
	}
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
        console.log(payload)
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

	watch(remainingPairs, currentValue => {
	    if (currentValue === 0) {
	        launchConfetti()
		}
	})

    watch(userSelection, currentValue => {
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
		grid-template-columns: repeat(6, 120rem);
		grid-template-rows: repeat(3, 120rem);
		gap: 30rem;
		justify-content: center;
		margin: 0 auto 40rem;
	}
	.cards_status {
		color: rgba(216, 241, 158, 0.8);
		text-align: center;
		margin: 0 0 20rem;
		font-size: 16rem;
	}
	.cards_button {
		display: block;
		margin: 0 auto;
		border: thin solid #d8f19e;
		padding: 15rem 40rem;
		background: #242425;
		border-radius: 5rem;
		color: #d8f19e;
		font-size: 20rem;
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
	@media(max-width: 991px) {
		.cards_inner {
			grid-template-columns: repeat(3, 100rem);
			grid-template-rows: repeat(6, 100rem);
			gap: 20rem;
		}
	}
</style>
