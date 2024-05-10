<template>
	<div class="cards_item" @click="selectCard">
		<div v-if="visible" class="cards_item-face is-front">{{value}} - {{position}} - {{matched}}</div>
		<div v-else class="cards_item-face is-back">Back</div>
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
		border: medium solid #021550;
		position: relative;
	}
	.cards_item-face {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		color: #fff;
	}
	.cards_item-face.is-front {
		background: red;
	}
	.cards_item-face.is-back {
		background: darkblue;
	}
</style>
