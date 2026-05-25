import type { OrderStatus } from "db";

export class Bid {
  userId: Number; // User ID of the users
  orderId: Number; // Order ID for the order created in the database
  status: OrderStatus;
  margin: string; // Collateral backing the order
  quantity: string; // Number of long positions
  bidPrice: string; // Price user is asking for
  totalValue: string; // Total order value
  createdAt: number = Date.now();
  updatedAt: number = Date.now();
  constructor(
    userId: Number,
    orderId: Number,
    status: OrderStatus,
    margin: string,
    quantity: string,
    askPrice: string,
    totalValue: string,
  ) {
    this.userId = userId;
    this.orderId = orderId;
    this.status = status;
    this.margin = margin;
    this.quantity = quantity;
    this.bidPrice = askPrice;
    this.totalValue = totalValue;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
