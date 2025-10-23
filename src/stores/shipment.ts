import {defineStore} from 'pinia'
import type {Shipment} from "@/types/shipment";
import {getShipments} from "@/services/shipments.mock";

export const shipmentStore = defineStore('shipment', {
  state: () => {
    return { shipment: null as Shipment | null }
  },
  actions: {
      loadShipment(id: string) {
          const shipments = getShipments();
          this.shipment = shipments.find(s => s.id === Number(id)) || null
        return this.shipment;
      },
    changeStatus(status: string) {
        if(this.shipment) {
          this.shipment.status = status
        }
    }
  },
})