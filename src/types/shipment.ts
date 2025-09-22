interface SkuItem {
  id: number,
  name: string,
  quantity: number,
}

export interface Shipment {
  id: number,
  vendor: string,
  date: string,
  status: string,
  items: Array<SkuItem>
}