export class OrderBookData {
  orderId: number;
  status: string;
  price: number;
  orderType: string;
  margin: number;
  market: string;
  type: string;
  quantity: number;
  constructor(
    orderId: number,
    market: string,
    type: string,
    quantity: number,
    margin: number,
    orderType: string,
    price: number,
    status: string,
  ) {
    this.orderId = orderId;
    this.market = market;
    this.type = type;
    this.quantity = quantity;
    this.margin = margin;
    this.orderType = orderType;
    this.price = price;
    this.status = status;
  }
}
