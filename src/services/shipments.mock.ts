import type { Shipment } from '@/types/shipment';
import shipmentsData from "@/mocks/shipments.json";

// Моки уже правильно типизированы, поэтому просто возвращаем их
export const getShipments = (): Shipment[] => {
  return shipmentsData;
};