/*
 Order book requires a better implementation
*/

import type { Ask } from "./data/ask";
import type { Bid } from "./data/bid";

export class OrderBook {
  bid: Bid[] = [];
  ask: Ask[] = [];
  constructor() {}
}
