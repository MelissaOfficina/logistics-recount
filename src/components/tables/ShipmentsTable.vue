<script setup lang="ts">
defineProps(["shipments"]);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
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
        v-for="shipment in shipments"
        :key="shipment.id"
        :data-testid="`shipments-row-${shipment.id}`"
      >
        <td>{{ shipment.id }}</td>
        <td>{{ shipment.vendor }}</td>
        <td>{{ formatDate(shipment.date) }}</td>
        <td>{{ shipment.status }}</td>
        <td>
          <router-link
            :to="{ name: 'shipment.detail', params: { id: shipment.id } }"
            :data-testid="`open-shipment-${shipment.id}`"
            >Открыть</router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>