export type BinId = 'good' | 'reject' | 'unknown';

export type ScannedItem = {
  skuId: string;
  name: string;
  qty: number; // суммарно отсканировано в рамках коробки
};

export type BinState = {
  id: BinId;
  title: string; // "Годный", "Брак", "Излишек"
  items: Record<string, ScannedItem>; // key: skuId
  totalQty: number; // агрегат
};

export type RecountState = {
  shipmentId: string;
  bins: Record<BinId, BinState>;
  expected: Record<string, number>; // from Shipment.items: skuId -> expectedQty
  scannedTotalBySku: Record<string, number>; // агрегат по всем коробкам
  status: 'idle' | 'in_progress' | 'ready_to_finish';
}