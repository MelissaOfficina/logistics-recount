<script setup lang="ts">
import { recountStore } from "@/stores/recount";
import { computed } from "vue";
defineProps(['shipment']);

const storeRecount = recountStore()
const unexpectedSkus = computed(() =>
  Object.keys(storeRecount.scannedTotalBySku).filter(
    sku => !(sku in storeRecount.expected)
  )
);
</script>
<template>
  <h3>Итоги</h3>
  <div v-if="storeRecount.expected">
    <div v-for="key in Object.keys(storeRecount.expected)" :key="key">
      <p>SKU <b>{{key}}</b> - <span :style="`color: ${storeRecount.scannedTotalBySku[key] === storeRecount.expected[key] ? 'green' : 'red'}`">ожидается {{storeRecount.expected[key]}}, отсканировано {{storeRecount.scannedTotalBySku[key] || 0}}</span></p>
    </div>
  </div>
  <div v-if="unexpectedSkus.length">
    <h4>Неожиданные SKU:</h4>
    <ul>
      <p v-for="sku in unexpectedSkus" :key="sku">
        <span style="color:red">SKU <b>{{ sku }}</b> — отсканировано {{ storeRecount.scannedTotalBySku[sku] }}</span>
      </p>
    </ul>
  </div>

</template>
