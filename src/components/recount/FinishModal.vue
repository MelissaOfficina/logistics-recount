<script setup lang="ts">
defineProps(['isOpen']);
const emit = defineEmits(['close-modal','finish-all'])

const closeModal = () => {
  emit('close-modal');
  emit('finish-all');
}
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" data-testid="finish-modal" @click.self="closeModal">
    <div class="modal-content">
      <p>Пересчет завершен</p>
      <button @click="closeModal" data-testid="confirm-placement-btn">Подтвердить размещение</button>
    </div>
  </div>
</template>

<style scoped>
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