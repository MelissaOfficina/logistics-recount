<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { shipmentStore } from "@/stores/shipment";
import { recountStore } from "@/stores/recount";
import { ref } from 'vue';
import BinPanel from "@/components/recount/BinPanel.vue";
import ScannerPanel from "@/components/recount/ScannerPanel.vue";
import SummaryPanel from "@/components/recount/SummaryPanel.vue";
import FinishModal from "@/components/recount/FinishModal.vue";
import Container from "@/components/toast/Container.vue";
import { useToast } from "vue-toastification";

const route = useRoute();
const storeShipment = shipmentStore()
const storeRecount = recountStore()
const router = useRouter()


const id = route.params.id;
if(id){
  storeShipment.loadShipment(id)
  storeRecount.init(id)
}

const isModalOpen = ref(false)
const finish = ref(false)
const toast = useToast();

const toggleModal = (show: boolean) => {
  isModalOpen.value = show
}

const finishAll = () => {
  finish.value = true;
  toast({
    component: Container,
    props: {
      message: 'Размещение завершено',
      testId: 'placement-finished-toast'
    }
  }, {
    onClose : () => {
      router.push('/shipments')
    }
  })
}
</script>

<template>
  <div data-testid="recount-screen-placeholder">Пересчет в поставке {{storeShipment.shipment?.id}} <router-link
    :to="{ name: 'shipment.detail' }"
  >Назад</router-link></div>
  <BinPanel />
  <ScannerPanel />
  <SummaryPanel :shipment="storeShipment.shipment" />

  <button v-if="!finish" :disabled="!storeRecount.isAllMatched" @click="toggleModal(true)" class="open-modal">Завершить пересчёт</button>

  <FinishModal :isOpen="isModalOpen" @close-modal="toggleModal(false)" @finish-all="finishAll" />
</template>

<script lang="ts">
export default {
  name: 'RecountProducts'
}
</script>

