import type { OrderStatus, OrderType, TradeType } from "db";

export type StreamEvent<T> = {
  type: string;
  data: T;
};

export type EngineResponse<T> = StreamEvent<T> & {
  success: boolean;
  error?: string;
};

export type RegisterUser = {
  correlationId: string;
  userId: string;
};

export type RegisterUserResponse = {
  correlationId: string;
  userId: string;
};

export type AddBalance = {
  correlationId: string;
  userId: string;
  amount: string;
};

export type AddBalanceResponse = {
  correlationId: string;
  userId: string;
  totalBalance: string;
};

export type MarketPriceUpdate = {
  symbol: string;
  marketPrice: string;
};

export type CreateOrder = {
  correlationId: string;
  orderId: string;
  userId: string;
  marketId: string;
  margin: string;
  quantity: string;
  price: string;
  totalValue: string;
  tradeType: TradeType;
  orderStatus: OrderStatus;
  orderType: OrderType;
  isPostOnly: boolean;
  isReduceOnly: boolean;
  isIoc: boolean;
};

export type CreateOrderResponse = {
  correlationId: string;
  orderId: string;
};

export function backendToStreamRecord<T>(event: StreamEvent<T>) {
  return {
    type: event.type,
    data: JSON.stringify(event.data),
  };
}

export function engineToStreamRecord<T>(event: EngineResponse<T>) {
  return {
    success: String(event.success),
    type: event.type,
    ...(event.data && {
      data: JSON.stringify(event.data),
    }),
    ...(event.error && { error: event.error }),
  };
}
