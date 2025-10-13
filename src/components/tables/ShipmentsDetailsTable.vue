<script setup lang="ts">
defineProps(['items']);
</script>

<template>
  <table data-testid="shipment-items-table">
    <thead>
    <tr>
      <th>SKU</th>
      <th>Название</th>
      <th>Ожидаемое количество</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items" :key="item.id">
      <td>{{item.id}}</td>
      <td>{{item.name}}</td>
      <td>{{item.quantity}}</td>
    </tr>
    </tbody>
  </table>
</template>