<script setup lang="ts">
defineProps({
  isOpen: Boolean
});
const emit = defineEmits(['close']);
</script>

<template>
  <Transition>
  <div v-if="isOpen" :class="'modal-backdrop'" @click.self="emit('close')">
    <div :class="'modal-content'">
      <slot />
    </div>
  </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  min-width: 300px;
  color:black
}
</style>