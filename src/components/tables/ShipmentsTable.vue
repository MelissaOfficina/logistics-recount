<script setup lang="ts">
import {formatDate} from "@/utils/formatDate";
import AppButton from "@/components/ui/AppButton.vue";
defineProps(["shipments"]);
</script>

<template>
  <table data-testid="shipments-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Поставщик</th>
        <th>Дата прихода</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="{id,vendor,date,status} in shipments"
        :key="id"
        :data-testid="`shipments-row-${id}`"
      >
        <td>{{ id }}</td>
        <td>{{ vendor }}</td>
        <td>{{ formatDate(date) }}</td>
        <td>{{ status }}</td>
        <td>
          <router-link :to="{ name: 'shipment.detail', params: { id: id } }" custom v-slot="{ navigate }" :data-testid="`open-shipment-${id}`">
            <AppButton @click="navigate" role="link">Открыть</AppButton>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>