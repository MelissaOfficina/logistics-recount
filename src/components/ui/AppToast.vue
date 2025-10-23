<script setup lang="ts">
defineProps<{
  message: string;
  title?: string;
  testId?: string;
}>()
</script>

<template>
  <div :data-testid="testId">
    <strong v-if="title">{{ title }}</strong>
    <div>{{ message }}</div>
  </div>
</template>

