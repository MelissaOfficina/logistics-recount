<script setup lang="ts">
import { getShipments } from "@/services/shipments.mock.ts";
import { useRoute } from 'vue-router'
import { computed } from "vue";
import ShipmentsDetailsTable from "@/components/tables/ShipmentsDetailsTable.vue";

const route = useRoute();
const shipment = computed(() => getShipments().find(shipment => shipment.id === Number(route.params.id)));

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<template>
  <div v-if="!shipment"><h3>Не найдено</h3></div>
  <div v-if="shipment">
    <h3>
      <span>Поставка {{shipment.id}} / {{shipment.vendor}} / {{formatDate(shipment.date)}} / {{shipment.status}}</span>
      &nbsp;&nbsp;<router-link
      :to="{ name: 'shipments' }"
    >Назад</router-link>
    </h3>
    <ShipmentsDetailsTable :items="shipment.items" />
    <div v-if="shipment.status === 'new'">
      <br>
      <router-link
        data-testid="start-recount-btn"
        :to="{ name: 'recount.detail' }"
      >Отправить на пересчёт</router-link>
    </div>
  </div>
</template>