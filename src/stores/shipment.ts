import {defineStore} from 'pinia'
import {Shipment} from "@/types/shipment";
import {getShipments} from "@/services/shipments.mock.ts";

export const shipmentStore = defineStore('shipment', {
  state: () => {
    return { shipment: null as Shipment | null }
  },
  actions: {
      loadShipment(id: string) {
          const shipments = getShipments();
          this.shipment = shipments.find(s => s.id === Number(id)) || null
      },
  },
})