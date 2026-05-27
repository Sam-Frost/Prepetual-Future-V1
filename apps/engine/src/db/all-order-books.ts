import type { CreateOrder } from "types";
import { EngineError } from "../util/engine-error";
import { OrderBook } from "./order-book";

export class OrderBooks {
  books: Map<string, OrderBook> = new Map();
  constructor() {}

  createBid(order: CreateOrder) {
    const orderBook = this.getMarketOrderBook(order.marketId);
    orderBook.addNewBid(order);
  }

  createAsk(order: CreateOrder) {
    const orderBook = this.getMarketOrderBook(order.marketId);
    orderBook.addNewAsk(order);
  }

  /*  
    

  */
  getAsks(marketId: string) {
    const book = this.books.get(marketId);

    if (!book) {
      throw new EngineError(`Orderbook not found for marketId : ${marketId}`);
    }

    return book.ask;
  }

  getBids(marketId: string) {
    const book = this.books.get(marketId);

    if (!book) {
      throw new EngineError(`Orderbook not found for marketId : ${marketId}`);
    }

    return book.bid;
  }

  createNewMarketOrderBook(marketId: string) {
    this.books.set(marketId, new OrderBook());
    console.log(this.books);
  }

  private getMarketOrderBook(marketId: string) {
    const orderBook = this.books.get(marketId);

    if (!orderBook) {
      throw new EngineError(
        `Orderbook doesn't exist for market id ${marketId}`,
      );
    }

    return orderBook;
  }
}
