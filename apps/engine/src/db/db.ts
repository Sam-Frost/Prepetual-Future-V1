/*

Optimization for the in-memory db will be picked up later, rn implement in the fastest way to code

*/

import { OrderBooks } from "./all-order-books";
import { Fill } from "./fill";
import { User } from "./user";

class InMemoryDb {
  user = new User();
  orderBook = new OrderBooks();
  fill = new Fill();
  constructor() {}
}

export const inMemoryDb = new InMemoryDb();
export type InMemoryDbType = InMemoryDb;
