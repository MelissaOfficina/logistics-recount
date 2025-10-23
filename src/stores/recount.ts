import { defineStore } from "pinia";
import type { BinId } from "@/types/recount";
import type { RecountState } from "@/types/recount";
import type {Bins} from "@/types/recount";
import { getShipments } from "@/services/shipments.mock";

const initialBins: Bins = {
  good: { id: 'good', title: 'Good', items: {}, totalQty: 0 },
  reject: { id: 'reject', title: 'Reject', items: {}, totalQty: 0 },
  unknown: { id: 'unknown', title: 'Unknown', items: {}, totalQty: 0 },
}

export const recountStore  = defineStore('recount', {
  state: (): RecountState => ({
    shipmentId: '',
    bins: {...initialBins},
    expected: {},
    scannedTotalBySku: {},
    status: 'idle',
    activeBinId: null
  }),
  persist:true,
  actions: {
    init(shipmentId: string) {
      this.shipmentId = shipmentId

      const shipments = getShipments();
      this.expected =
        shipments.find(s => s.id === Number(shipmentId))?.items.reduce<Record<string, number>>(
          (acc, { id, quantity }) => {
            acc[id] = quantity
            return acc
          },
          {}
        ) || {}
    },
    setActiveBin(id: BinId) {
      this.activeBinId = id
    },
    scanSku(sku : string, qty :number, bin: BinId) {
      if (!this.activeBinId) return;
      if (!this.bins[bin]) return;

      this.bins[bin].items[sku] = qty
      this.bins[bin].totalQty = this.bins[bin].totalQty + qty

      this.recalculateBinTotal(bin)
      this.changeScannedTotalBySku(sku,qty)
    },
    changeBinQty(bin: BinId, sku:string, qty: number) {
      if (!this.bins[bin]) return;
      const items = this.bins[bin].items;
      if (!items) return;
      if(qty === 0){
        delete items[sku]
      }else{
        items[sku] = qty
      }

      this.recalculateBinTotal(bin)
      this.changeScannedTotalBySku(sku,qty)
    },
    changeScannedTotalBySku(sku : string,qty : number) {
      if(qty === 0){
        delete this.scannedTotalBySku[sku]
      }else{
        this.scannedTotalBySku[sku] = qty
      }
    },
    recalculateBinTotal(bin: BinId) {
      const binData = this.bins[bin]
      if (!binData) return

      const items = binData.items || {}
      binData.totalQty = Object.values(items).reduce((sum, q) => sum + q, 0)
    },
    resetAfterRecount() {
      this.status = 'idle';
      this.$reset();
      Object.keys(localStorage).forEach(k => { if (k.includes('recount')) localStorage.removeItem(k) });
    }
  },
  getters: {
    diffBySku() {
    },
    isAllMatched(state: RecountState) {
      const expected = state.expected
      const scanned = state.scannedTotalBySku

      const keys1 = Object.keys(expected)
      const keys2 = Object.keys(scanned)

      if (keys1.length !== keys2.length) return false

      return keys1.every(key => expected[key] === scanned[key])
    },
    hasOverageOrUnknown() {

    }
  }
})