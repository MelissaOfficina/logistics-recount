<script setup lang="ts">
import AppModal from "@/components/ui/AppModal.vue";
import AppButton from "@/components/ui/AppButton.vue";

defineProps({ isOpen: Boolean });
const emit = defineEmits(['close-modal', 'finish-all']);

const close = () => {
  emit('finish-all');
  emit('close-modal');
};
</script>

<template>
  <AppModal :isOpen="isOpen" @close="emit('close-modal')">
    <p>Пересчет завершен</p>
    <AppButton @click="close" e2e="confirm-placement-btn">Подтвердить размещение</AppButton>
  </AppModal>
</template>


