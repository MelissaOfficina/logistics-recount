<script setup lang="ts">
import { reactive } from 'vue'
import { recountStore } from "@/stores/recount";
import AppButton from "@/components/ui/AppButton.vue";
import AppInput from "@/components/ui/AppInput.vue";

const storeRecount = recountStore()

interface ScannerLocalStore {
  sku: string;
  qty: number;
  init(): void;
  setSku(sku: string): void;
  setQty(qty: number): void;
}

const scannerLocalStore = reactive<ScannerLocalStore>({
  sku: '',
  qty: 1,
  init(){
    this.sku = ''
    this.qty = 1
  },
  setSku(sku): void {
    this.sku = sku
  },
  setQty(qty): void {
    this.qty = Number(qty) > 1 ? Number(qty) : 1
  }
});

const addToActiveBin = () => {
  if(!storeRecount.activeBinId){
    return;
  }
  storeRecount.scanSku(scannerLocalStore.sku, scannerLocalStore.qty, storeRecount.activeBinId);
  scannerLocalStore.init()
}

</script>
<template>
  <div v-if="storeRecount.activeBinId" class="scanner-panel">
    <label :for="`sku`">
      <AppInput :type="'text'"
                :name="`sku`"
                :id="'sku'"
                @keyup="(e) => scannerLocalStore.setSku((e.target as HTMLInputElement).value || '')"
                :placeholder="'Введите SKU/штрихкод'"
                :value="scannerLocalStore.sku"
                :autofocus="true"
      />
    </label>&nbsp;&nbsp;
    <label :for="`qty`">
      <AppInput :type="'number'"
                :name="`qty`"
                :id="'qty'"
                @change="(e) => scannerLocalStore.setQty(Number((e.target as HTMLInputElement)?.value) || 1)"
                @keyup="(e) => scannerLocalStore.setQty(Number((e.target as HTMLInputElement)?.value) || 1)"
                :placeholder="'Введите количество'"
                :value="scannerLocalStore.qty" /></label>
    <br /><br />
    <div class="block">
      <AppButton @click="addToActiveBin()" :disabled="!scannerLocalStore.sku" styleClass="scan">Сканировать</AppButton>
    </div>
  </div>
</template>