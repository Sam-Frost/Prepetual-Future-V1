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
  amount: number;
};

export type AddBalanceResponse = {
  correlationId: string;
  userId: number;
  totalBalance: number;
};

export type MarketPriceUpdate = {
  symbol: string;
  marketPrice: string;
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
