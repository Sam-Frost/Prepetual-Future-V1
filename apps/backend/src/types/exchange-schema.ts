import { z } from "zod";

export const onrampSchema = z.object({
  amount: z.number().min(0, "Amount cannot be negative"),
});
