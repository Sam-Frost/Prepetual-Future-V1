import z from "zod";
import { numericString } from "./common-zod";
import { OrderType, TradeType } from "db";

export const createOrderSchema = z.object({
  margin: numericString,
  quantity: numericString,
  price: numericString,
  totalValue: numericString,
  tradeType: z.enum([TradeType.SHORT, TradeType.LONG]),
  orderType: z.enum([OrderType.LIMIT, OrderType.MARKET]),
  isPostOnly: z.boolean(),
  isReduceOnly: z.boolean(),
  isIoc: z.boolean(),
});
