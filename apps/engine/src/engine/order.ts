import { OrderType, TradeType } from "db";
import type { CreateOrder } from "types";
import { inMemoryDb } from "../db/db";

// This is a complete single threaded operation
export function createOrder(order: CreateOrder) {
  // Has enough collateral
  const userBalance = inMemoryDb.userBalance.getUserBalance(order.userId);

  //   if (userBalance.balance >= order.margin)
  //     if (order.orderType == OrderType.MARKET) {
  //       if (order.tradeType == TradeType.SHORT) {
  //       } else {
  //       }
  //     } else {
  //       if (order.tradeType == TradeType.SHORT) {
  //       } else {
  //       }
  //     }

  // Lock the balance
}

export function cancelOrder() {}
