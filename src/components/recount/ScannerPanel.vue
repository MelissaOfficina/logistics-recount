<script setup lang="ts">
import { reactive } from 'vue'
import { recountStore } from "@/stores/recount";

const storeRecount = recountStore()

const scannerLocalStore = reactive({
  sku: '',
  qty: 1,
  init(){
    this.sku = ''
    this.qty = 1
  },
  setSku(sku: string): void {
    this.sku = sku
  },
  setQty(qty: string): void {
    this.qty = Number(qty) > 1 ? Number(qty) : 1
  }
});

const addToActiveBin = () => {
  storeRecount.scanSku(scannerLocalStore.sku, scannerLocalStore.qty, storeRecount.activeBinId);
  scannerLocalStore.init()
}

</script>
<template>
  <div v-if="storeRecount.activeBinId" class="scanner-panel">
    <label :for="`sku`">
      <input
        type="text"
        :name="`sku`"
        @keyup="scannerLocalStore.setSku($event.target.value)"
        placeholder="Введите SKU/штрихкод"
        :value="scannerLocalStore.sku"
      >
    </label>&nbsp;&nbsp;
    <label :for="`qty`">
      <input
        type="number"
        min="1"
        :name="`qty`"
        @change="scannerLocalStore.setQty($event.target.value)"
        @keyup="scannerLocalStore.setQty($event.target.value)"
        placeholder="Введите количество"
        :value="scannerLocalStore.qty"
      ></label>
    <br /><br />
    <div class="block">
      <button @click="addToActiveBin()" :disabled="!scannerLocalStore.sku?.length > 0">Сканировать</button>
    </div>
  </div>
</template>
<style scoped>
input[type^=]{
  background:#fff;
  padding:5px 10px;
  color:black
}
</style>