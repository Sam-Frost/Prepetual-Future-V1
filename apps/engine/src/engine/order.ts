import { OrderType, TradeType } from "db";
import { calc, type CreateOrder } from "types";
import { inMemoryDb } from "../db/db";
import { sendErrorResponse, sendOrderCreatedAck } from "../redis/sendToBackend";

// This is a complete single threaded operation
export async function createOrder(order: CreateOrder) {
  // Get user balance and current position
  const userBalance = inMemoryDb.user.getUserBalance(order.userId);
  // const userPosition = inMemoryDb.user.getCurrentPosition(
  //   order.userId,
  //   order.marketId,
  // );

  if (order.orderType == OrderType.MARKET) {
    if (order.tradeType == TradeType.SHORT) {
      /*
        check if trying to close long position :
        yes ->  don't lock balance, proceed normal, also take care of reduce only flag
        no -> lock balance, proceed normal
        
        find the matching fills,
        complete fill ->
        partial fill ->
        */

      const balance = userBalance.balance;

      // Not enough balance to place order
      if (balance < calc.toScaled(order.margin)) {
        sendErrorResponse();
      }

      // inMemoryDb.orderBook.getAsks("", "", "");
    } else {
      // Long Order
    }
  } else {
    // Limit Order
    if (order.tradeType == TradeType.LONG) {
      const balance = userBalance.balance;

      // Not enough balance to place order
      if (balance < calc.toScaled(order.margin)) {
        sendErrorResponse();
      }

      inMemoryDb.orderBook.createBid(order);

      await sendOrderCreatedAck(order);
      return;
    } else {
      const balance = userBalance.balance;

      // Not enough balance to place order
      if (balance < calc.toScaled(order.margin)) {
        sendErrorResponse();
      }

      inMemoryDb.orderBook.createAsk(order);

      await sendOrderCreatedAck(order);
      return;
      // Short Order
    }
  }

  // Lock the balance
}

// This function will ensure that this order is created by liqudation engine
export async function createLiqudationOrder() {
  // Payload will also have the existing state of the user positions at which liqudation order was issued
  // Incase the user already closed themselves to prevent them for liquidation
}
export function cancelOrder() {}
