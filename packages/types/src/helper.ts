export const generateAmountFromString = (
  amount: string,
  precision: number = 2,
) => {
  return Number(amount).toPrecision(precision);
};
