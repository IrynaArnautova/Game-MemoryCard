<template>
	<div class="cards_item" :class="{'matched': matched, 'is-flipped': flippedStyles}" @click="selectCard">
		<div class="cards_item-face is-front">
			<NuxtImg
					:src="`/cat-${value}.png`"
					class="cards_item-img"
					alt=""
			/>
		</div>
		<div class="cards_item-face is-back"></div>
	</div>
</template>

<script setup>
	import { computed } from 'vue';
    const props = defineProps ({
		matched: {
		    type: Boolean,
			default: false
		},
		position: {
		    type: Number,
			required: true
		},
		value: {
            type: Number,
            required: true
        },
		visible: {
		    type: Boolean,
			default: false
		}
	})

	const flippedStyles = computed(() => {
		if(props.visible) {
		    return 'is-flipped'
		}
	})

	const emits = defineEmits(['select-card'])
	const selectCard = () => {
        emits('select-card', {
            position: props.position,
			faceValue: props.value
        })
	}



</script>

<style scoped>
	.cards_item {
		position: relative;
		border-radius: 10px;
		box-shadow: 0 0 4px 2px rgba(216, 241, 158, 0.6);
		overflow: hidden;
		transition: transform .5s ease-in;
		transform-style: preserve-3d;
	}
	.cards_item.matched {
		opacity: 0.5;
	}
	.cards_item.is-flipped {
		transform: rotateY(180deg);
	}
	.cards_item-face {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		color: #fff;
		background: url(/assets/images/bg-card-back.svg) #131315 no-repeat center/24px;
	}
	.cards_item.is-flipped .is-back {
		transition-delay: .5s;
		opacity: 0;
	}
	.cards_item-img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: cover;
	}
</style>
