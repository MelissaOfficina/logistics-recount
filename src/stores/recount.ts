import { defineStore } from "pinia";
import { RecountState } from "@/types/recount";
import { getShipments } from "@/services/shipments.mock";

const initialBins = [
  { id: 'bin-good', title: 'Годный',   items: {}, totalQty: 0 },
  { id: 'bin-reject', title: 'Брак',     items: {}, totalQty: 0 },
  { id: 'bin-unknown', title: 'Излишек',  items: {}, totalQty: 0 }
]

export const recountStore  = defineStore('recount', {
  state: (): RecountState => ({
    shipmentId: '',
    bins: initialBins,
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

      this.bins = this.bins?.length ? this.bins : initialBins
    },
    setActiveBin(id: string) {
      this.activeBinId = id
    },
    scanSku(sku, qty, bin) {
      if (!this.activeBinId) return;
      const bin_ = this.bins.find(b => String(b.id) === String(bin));
      if (!bin_) return;

      bin_.items[sku] = qty
      bin_.totalQty = bin_.totalQty + qty

      this.changeScannedTotalBySku(sku,qty)
    },
    changeBinQty(bin: number, sku:string, qty: number) {
      const items = this.bins.find(b => String(b.id) === String(bin)).items;
      if (!items) return;
      if(qty === 0){
        delete items[sku]
      }else{
        items[sku] = qty
      }

      this.changeScannedTotalBySku(sku,qty)
    },
    changeScannedTotalBySku(sku,qty) {
      if(sku === 0){
        delete this.scannedTotalBySku[sku]
      }else{
        this.scannedTotalBySku[sku] = qty
      }
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