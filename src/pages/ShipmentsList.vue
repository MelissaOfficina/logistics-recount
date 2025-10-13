<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from 'vue-router'
  import { getShipments } from "@/services/shipments.mock.ts";
  import type { Shipment } from "@/types/shipment.ts";
  import ShipmentsTable from "@/components/tables/ShipmentsTable.vue";

  const router = useRouter()
  router.push('/shipments');

  const shipments = ref<Shipment[]>(getShipments());
</script>
<template>
  <h2>Список поставок</h2>
  <div v-if="shipments.length > 0">
    <ShipmentsTable :shipments="shipments" />
  </div>
  <div v-else>
    <p>Поставок нет</p>
  </div>
</template>