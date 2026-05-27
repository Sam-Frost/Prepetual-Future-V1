/*
 Order book requires a better implementation
*/

import type { CreateOrder } from "types";
import { Ask } from "./data/ask";
import { Bid } from "./data/bid";

export class OrderBook {
  bid: Map<string, Bid[]> = new Map();
  ask: Map<string, Ask[]> = new Map();
  constructor() {}

  addNewBid(order: CreateOrder) {
    // Get the bids arrays for this price
    const bids = this.bid.get(order.price);

    if (!bids) {
      const newBidsArray: Bid[] = [];
      newBidsArray.push(new Bid(order));
      this.bid.set(order.price, newBidsArray);
    } else {
      bids.push(new Bid(order));
    }
  }

  addNewAsk(order: CreateOrder) {
    // Get the asks arrays for this price
    const asks = this.ask.get(order.price);

    if (!asks) {
      const newAsksArray: Ask[] = [];
      newAsksArray.push(new Ask(order));
      this.ask.set(order.price, newAsksArray);
    } else {
      asks.push(new Ask(order));
    }
  }
}
