<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getShipments } from "@/services/shipments.mock";
import type { Shipment } from "@/types/shipment";
import ShipmentsTable from "@/components/tables/ShipmentsTable.vue";
import StateBlock from "@/components/ui/StateBlock.vue";

const loading = ref(true);
const shipments = ref<Shipment[]>([]);

onMounted(async () => {
  try {
    shipments.value = await new Promise<Shipment[]>((resolve) =>
      setTimeout(() => resolve(getShipments()), 500)
    );
  } finally {
    loading.value = false;
  }
});
</script>
<template>
  <div v-if="loading">
    <StateBlock />
  </div>
  <div v-else>
    <h2>Список поставок</h2>
    <div v-if="shipments.length > 0">
      <ShipmentsTable :shipments="shipments" />
    </div>
    <div v-else>
      <p>Поставок нет</p>
    </div>
  </div>

</template>