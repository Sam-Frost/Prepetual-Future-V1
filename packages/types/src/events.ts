import type { OrderStatus, OrderType, TradeType } from "db";

export type StreamEvent<T> = {
  type: string;
  data: T;
};

export type EngineResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type RegisterUser = {
  correlationId: string;
  userId: number;
};

export type RegisterUserResponse = {
  correlationId: string;
  userId: number;
};

export type AddBalance = {
  correlationId: string;
  userId: number;
  amount: string;
};

export type AddBalanceResponse = {
  correlationId: string;
  userId: number;
  totalBalance: string;
};

export type MarketPriceUpdate = {
  symbol: string;
  marketPrice: string;
};

export type CreateOrder = {
  correlationId: string;
  orderId: number;
  userId: number;
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

export function backendToStreamRecord<T>(event: StreamEvent<T>) {
  return {
    type: event.type,
    data: JSON.stringify(event.data),
  };
}

export function engineToStreamRecord<T>(
  success: boolean,
  event?: StreamEvent<T>,
  error?: string,
) {
  return {
    success: String(success),
    ...(event && {
      data: JSON.stringify(event),
    }),
    ...(error && { error }),
  };
}
