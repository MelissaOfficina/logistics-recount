<script setup lang="ts">
import { useRoute } from 'vue-router'
import { shipmentStore } from "@/stores/shipment";
import { recountStore } from "@/stores/recount";
import BinPanel from "@/components/recount/BinPanel.vue";
import ScannerPanel from "@/components/recount/ScannerPanel.vue";
import SummaryPanel from "@/components/recount/SummaryPanel.vue";
const route = useRoute();
const storeShipment = shipmentStore()
const storeRecount = recountStore()

const id = route.params.id;
if(id){
  storeShipment.loadShipment(id)
  storeRecount.init(id)
}

</script>
<template>
  <div data-testid="recount-screen-placeholder">Пересчет в поставке {{storeShipment.shipment?.id}} <router-link
    :to="{ name: 'shipment.detail' }"
  >Назад</router-link></div>
  <BinPanel />
  <ScannerPanel />
  <SummaryPanel :shipment="storeShipment.shipment" />
</template>

