import { defineStore } from "pinia";
import { RecountState } from "@/types/recount";
import { getShipments } from "@/services/shipments.mock";

export const recountStore  = defineStore('recount', {
  state: (): RecountState => ({
    shipmentId: '',
    bins: [],
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

      // создаём 3 пустые коробки
      this.bins = this.bins?.length ? this.bins : [
        { id: '1', title: 'Годный',   items: {}, totalQty: 0 },
        { id: '2', title: 'Брак',     items: {}, totalQty: 0 },
        { id: '3', title: 'Излишек',  items: {}, totalQty: 0 }
      ]
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
    diffBySku(sku,state) {
    },
    isAllMatched(state: RecountState) {
      const expected = state.expected
      const scanned = state.scannedTotalBySku

      console.log(expected,scanned)

      const keys1 = Object.keys(expected)
      const keys2 = Object.keys(scanned)

      if (keys1.length !== keys2.length) return false

      return keys1.every(key => expected[key] === scanned[key])
    },
    hasOverageOrUnknown(state: RecountState) {

    }
  }
})