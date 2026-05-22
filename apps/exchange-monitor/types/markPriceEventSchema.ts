import z from "zod";

export const markPriceEventSchema = z.object({
  e: z.string(),
  E: z.number(),
  s: z.string(), // symbol
  p: z.string(), // mark price
  ap: z.string(),
  i: z.string(),
  P: z.string(),
  r: z.string(),
  T: z.number(),
});

export type MarkPriceType = z.infer<typeof markPriceEventSchema>;
