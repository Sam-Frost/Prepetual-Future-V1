import type { OrderStatus } from "db";
import type { CreateOrder } from "types";

export class Bid {
  userId: string; // User ID of the users
  orderId: string; // Order ID for the order created in the database
  status: OrderStatus;
  margin: string; // Collateral backing the order
  quantity: string; // Number of long positions
  bidPrice: string; // Price user is asking for
  totalValue: string; // Total order value
  createdAt: number = Date.now();
  updatedAt: number = Date.now();
  constructor(order: CreateOrder) {
    this.userId = order.userId;
    this.orderId = order.orderId;
    this.status = order.orderStatus;
    this.margin = order.margin;
    this.quantity = order.quantity;
    this.bidPrice = order.price;
    this.totalValue = order.totalValue;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
