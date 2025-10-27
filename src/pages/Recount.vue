<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { shipmentStore } from "@/stores/shipment";
import { recountStore } from "@/stores/recount";
import { onMounted, ref } from "vue";
import BinPanel from "@/components/recount/BinPanel.vue";
import ScannerPanel from "@/components/recount/ScannerPanel.vue";
import SummaryPanel from "@/components/recount/SummaryPanel.vue";
import FinishModal from "@/components/recount/FinishModal.vue";
import AppToast from "@/components/ui/AppToast.vue";
import { useToast } from "vue-toastification";
import NotFound from "@/pages/NotFound.vue";
import type { Shipment } from "@/types/shipment";
import AppButton from "@/components/ui/AppButton.vue";

const route = useRoute();
const storeShipment = shipmentStore();
const storeRecount = recountStore();
const router = useRouter();

const loading = ref(true);
const notFound = ref(false);
const shipment = ref<Shipment | null>(null);

onMounted(async () => {
  const id = String(route.params.id);
  try {
    await storeShipment.loadShipment(id);
    const _shipment = storeShipment.shipment;
    if (!_shipment || _shipment && _shipment?.status !== "new") {
      notFound.value = true;
      return;
    }
    shipment.value = _shipment
    storeRecount.init(id);
  } catch (e) {
    notFound.value = true;
  } finally {
    loading.value = false;
  }
});

const isModalOpen = ref(false);
const finish = ref(false);
const toast = useToast();

const toggleModal = (show: boolean) => {
  isModalOpen.value = show;
};

const finishAll = () => {
  finish.value = true;
  storeRecount.resetAfterRecount();
  storeShipment.changeStatus('completed');
  toast(
    {
      component: AppToast,
      props: {
        message: "Размещение завершено",
        testId: "placement-finished-toast",
      },
    },
    {
      onClose: () => {
        router.push("/shipments");
      },
    },
  );
};
</script>

<template>
  <div v-if="shipment?.id">
    <div data-testid="recount-screen-placeholder">
      <h6>Пересчет в поставке</h6>
      <p>ID поставки: {{ shipment.id }}</p>
      <p>Статус: {{ shipment.status }}</p>
      <router-link :to="{ name: 'shipment.detail' }">Назад</router-link>
    </div>
    <BinPanel />
    <ScannerPanel />
    <SummaryPanel :shipment="storeShipment.shipment" />

    <AppButton @click="toggleModal(true)" :show="!finish" :disabled="!storeRecount.isAllMatched" styleClass="open-modal" >Завершить пересчет</AppButton>

    <FinishModal
      :isOpen="isModalOpen"
      @close-modal="toggleModal(false)"
      @finish-all="finishAll"
    />
  </div>
  <div v-else><NotFound /></div>
</template>

<script lang="ts">
export default {
  name: "RecountProducts",
};
</script>
