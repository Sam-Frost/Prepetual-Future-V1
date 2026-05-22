import { OrderBook } from "./orderbook";
import { UserBalance } from "./userbalance";
import { Position } from "./postitions";

const userBalance: UserBalance[] = [];
const orderBook: OrderBook[] = [];
const position: Position[] = [];

export const InMemoryDb = {
  userBalance: userBalance,
  orderbook: orderBook,
  position: position,
};
