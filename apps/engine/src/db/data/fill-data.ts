export class FillData {
  orderId: Number; // Order ID for the order created in the database
  makerId: Number;
  takerId: Number;
  price: string; // Price at which position got filled
  margin: string; // Collateral backing the order
  quantity: string; // Number positions
  totalValue: string; // Total order value
  createdAt: number = Date.now();
  updatedAt: number = Date.now();
  constructor(
    orderId: Number,
    makerId: Number,
    takerId: Number,
    margin: string,
    quantity: string,
    askPrice: string,
    totalValue: string,
  ) {
    this.makerId = makerId;
    this.takerId = takerId;
    this.orderId = orderId;
    this.margin = margin;
    this.quantity = quantity;
    this.price = askPrice;
    this.totalValue = totalValue;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
