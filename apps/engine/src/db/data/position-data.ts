import type { TradeType } from "db";

export class PositionData {
  type: TradeType;
  quantity: string;
  entryPrice: string;
  constructor(type: TradeType, quantity: string, entryPrice: string) {
    this.type = type;
    this.quantity = quantity;
    this.entryPrice = entryPrice;
  }
}
