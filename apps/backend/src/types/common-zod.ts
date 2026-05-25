import z from "zod";

export const numericString = z.string().regex(/^[0-9.]+$/, {
  message: "Must be a numeric string with only digits and dots",
});

export const positiveNumericString = z.string().regex(/^\d+(\.\d+)?$/, {
  message: "Must be a positive numeric string",
});
