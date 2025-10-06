<script setup lang="ts">
import { recountStore } from "@/stores/recount";
defineProps(['bins']);

const storeRecount = recountStore()

const changeQuantity = (bin:string,sku:string,qty:string,plus:boolean) => {
  let newQty = Number(qty)

  if (plus) {
    newQty = newQty + 1
  } else {
    newQty = Math.max(0, newQty - 1)
  }
  storeRecount.changeBinQty(bin,sku,newQty);
}

</script>
<template>
  <div class="container">
    <div
      class="item"
      :class="{ active: storeRecount.activeBinId === item.id }"
         v-for="item in storeRecount.bins"
         :key="item.id"
         :data-testid="`bins-item-${item.id}`"
    >
      <h4>{{item.title}}: <span class="">{{item.totalQty}}</span></h4>
      <div v-for="(qty, sku) in item.items" :key="sku">
        <p>{{sku}}: {{qty}}</p>
        <button @click="changeQuantity(item.id,sku,qty,false)">-</button>&nbsp;<button @click="changeQuantity(item.id,sku,qty,true)">+</button>
      </div>
      <hr />
      <button @click="storeRecount.setActiveBin(item.id)">Выбрать</button>
    </div>
  </div>
</template>

<style scoped>
div{
  margin-bottom:10px
}
.container {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-top:20px
}

.item {
  flex: 1;
  background: #aaa;
  padding: 10px 20px;
  text-align: center;
  border:5px solid transparent;
}

.item.active{
  border-color:gold
}
</style>