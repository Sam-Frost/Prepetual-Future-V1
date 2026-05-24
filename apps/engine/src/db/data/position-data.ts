export class PositionData {
  market: string;
  type: string;
  quantity: any;
  margin: number;
  liquidationPrice: number;
  pnl: number;
  averagePrice: number;
  constructor(
    market: string,
    type: string,
    quantity: number,
    margin: number,
    liquidationPrice: number,
    pnl: number,
    averagePrice: number,
  ) {
    this.market = market;
    this.type = type;
    this.quantity = quantity;
    this.margin = margin;
    this.liquidationPrice = liquidationPrice;
    this.pnl = pnl;
    this.averagePrice = averagePrice;
  }
}
