<script setup lang="ts">
import { getShipments } from "@/services/shipments.mock.ts";
import { useRoute } from 'vue-router'
import { computed } from "vue";
import ShipmentsDetailsTable from "@/components/tables/ShipmentsDetailsTable.vue";
import {formatDate} from "@/utils/formatDate";

const route = useRoute();
const shipment = computed(() => getShipments().find(shipment => shipment.id === Number(route.params.id)));


</script>

<template>
  <div v-if="shipment">
    <h3>
      <span data-testid="shipment-header">Поставка {{shipment.id}} / {{shipment.vendor}} / {{formatDate(shipment.date)}} / {{shipment.status}}</span>
      &nbsp;&nbsp;<router-link
      :to="{ name: 'shipments' }"
    >Назад</router-link>
    </h3>

    <div v-if="shipment.items.length > 0">
      <ShipmentsDetailsTable :items="shipment.items" />
    </div>
    <div v-else><p>Нет товаров</p></div>

    <div v-if="shipment.status === 'new'">
      <br>
      <router-link
        data-testid="start-recount-btn"
        :to="{ name: 'recount.detail' }"
      >Отправить на пересчёт</router-link>
    </div>
  </div>
  <div v-else><h3>Не найдено</h3></div>
</template>