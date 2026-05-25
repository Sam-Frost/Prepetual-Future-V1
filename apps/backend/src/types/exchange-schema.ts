import { z } from "zod";
import { positiveNumericString } from "./common-zod";

export const onrampSchema = z.object({
  amount: positiveNumericString,
});

export const getPositionSchema = z.object({
  userId: z.number(),
  p: z.number(),
  marketId: z.number(),
});
