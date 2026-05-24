/*

Optimization for the in-memory db will be picked up later, rn implement in the fastest way to code

*/

import { OrderBook } from "./order-book";
import { Position } from "./position";
import { UserBalance } from "./user-balance";

class InMemoryDb {
  userBalance = new UserBalance();
  orderBook = new OrderBook();
  position = new Position();
  constructor() {}
}

export const inMemoryDb = new InMemoryDb();
