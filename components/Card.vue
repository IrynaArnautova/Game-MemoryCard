<template>
	<div class="cards_item" :class="{matched: matched}" @click="selectCard">
		<NuxtImg
			:src="`/cat-${value}.png`"
			:class="{'is-front': visible}"
			class="cards_item-img"
			alt=""
		/>
		<div
			:class="{'is-back': !visible}"
			class="cards_item-face"
		></div>
	</div>
</template>

<script setup>
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
	}
	.cards_item.matched {
		opacity: 0.5;
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
	.cards_item-img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: cover;
	}
	.cards_item-img.is-front {
		z-index: 1;
	}
</style>
