import { z } from "zod";

export const onrampSchema = z.object({
  amount: z.number().min(0, "Amount cannot be negative"),
});

export const getPositionSchema = z.object({
  userId: z.number(),
  p: z.number(),
  marketId: z.number(),
});
