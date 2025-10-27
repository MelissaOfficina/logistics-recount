<script setup lang="ts">
const emit = defineEmits(['keyup','change'])
defineProps<{
  id?: string
  name?: string
  placeholder?: string
  qty?: string
  type?: string
  value?: string | number
  min?: number
  max?: number
  autofocus ?: boolean
}>()
</script>
<template>
  <input
    :type="type"
    :name="name"
    :id="id"
    :min="min"
    autofocus
    @keyup="e => emit('keyup', e)"
    @change="e => emit('change', e)"
    :placeholder="placeholder"
    :value="value"
    class="input"
  />
</template>
<style scoped>
input.input{
  background:#fff;
  padding:10px 15px;
  color:black;
  border:0;
  border-radius:8px
}
</style>
