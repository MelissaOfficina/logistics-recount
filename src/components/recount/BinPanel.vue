<script setup lang="ts">
import { recountStore } from "@/stores/recount";
import AppButton from "@/components/ui/AppButton.vue";
defineProps(['bins']);

const storeRecount = recountStore()

const changeQuantity = (bin:"good" | "reject" | "unknown",sku:string,qty:number,plus:boolean) => {
  let newQty = Number(qty)

  if (plus) {
    newQty = newQty + 1
  } else {
    newQty = Math.max(0, newQty - 1)
  }
  storeRecount.changeBinQty(bin,sku,newQty);
}

console.log(storeRecount)

</script>
<template>
  <div class="container">
    <div
      class="item"
      :class="{ active: storeRecount.activeBinId === item.id }"
         v-for="item in storeRecount.bins"
         :key="item.id"
         :data-testid="`bin-${item.id}`"
    >
      <h4>{{item.title}}: <span :data-testid="`bin-${item.id}-total`">{{item.totalQty}}</span></h4>
      <TransitionGroup name="list" tag="div" class="items-list">
        <div v-for="(qty, sku) in item.items" :key="sku">
          <p>{{sku}}: {{qty}}</p>
          <AppButton @click="changeQuantity(item.id,sku,qty,false)" styleClass="quantity minus">-</AppButton>&nbsp;<AppButton @click="changeQuantity(item.id,sku,qty,true)" styleClass="quantity plus" >+</AppButton>

        </div>
      </TransitionGroup>
      <hr />
      <AppButton @click="storeRecount.setActiveBin(item.id)" styleClass="choose">Выбрать</AppButton>
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
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>