<script setup lang="ts">
import { recountStore } from "@/stores/recount";
defineProps(['shipment']);

const storeRecount = recountStore()
</script>
<template>
  <h3>Итоги</h3>
  <div v-if="shipment.items.length > 0">
    <div v-for="item in shipment.items" :key="item.id">
      <p>sku {{item.id}} - <span :style="`color: ${storeRecount.scannedTotalBySku[item.id] === item.quantity ? 'green' : 'red'}`">ожидается {{item.quantity}}</span></p>
    </div>
  </div>
  <button :disabled="!storeRecount.isAllMatched">Завершить пересчёт</button>
</template>
