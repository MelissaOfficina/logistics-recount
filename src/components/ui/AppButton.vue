<script setup>
const emit = defineEmits(['click'])
defineProps({
  click: Function,
  e2e: String,
  styleClass: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: true
  }
})
</script>
<template>
  <button v-if="show" @click="emit('click')" :data-testid="e2e" :class="`button${styleClass ? ' '+styleClass : ''}`" :disabled="disabled">
    <slot />
  </button>
</template>
<style>

</style>
