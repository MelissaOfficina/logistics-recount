<script setup lang="ts">
import { getShipments } from "@/services/shipments.mock";
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import ShipmentsDetailsTable from "@/components/tables/ShipmentsDetailsTable.vue";
import { formatDate } from "@/utils/formatDate";
import NotFound from "@/pages/NotFound.vue";
import AppButton from "@/components/ui/AppButton.vue";

const route = useRoute();
const shipment = computed(() =>
  getShipments().find((shipment) => shipment.id === Number(route.params.id)),
);

const loading = ref(true);

onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <div v-if="shipment">
    <h3>
      <span data-testid="shipment-header"
        >Поставка {{ shipment.id }} / {{ shipment.vendor }} /
        {{ formatDate(shipment.date) }} / {{ shipment.status }}</span
      >
      &nbsp;&nbsp;<router-link :to="{ name: 'shipments' }">Назад</router-link>
    </h3>

    <div v-if="shipment.items.length > 0">
      <ShipmentsDetailsTable :items="shipment.items" />
    </div>
    <div v-else><p>Нет товаров</p></div>

    <div v-if="shipment.status === 'new'">
      <br />
      <router-link :to="{ name: 'recount.detail' }" custom v-slot="{ navigate }">
        <AppButton @click="navigate" role="link" :e2e="'start-recount-btn'">Отправить на пересчёт</AppButton>
      </router-link>
    </div>
  </div>
  <div v-else><NotFound /></div>
</template>