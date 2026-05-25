export const MONEY_SCALE = 2;

function toScaled(amount: string, scale: number) {
  const [wholeNumber, fractional = ""] = amount.split(".");

  const decimal = fractional.padEnd(scale, "0").slice(0, scale);

  const combined = wholeNumber + decimal;
  return BigInt(combined);
}

function fromScaled(amount: bigint, scale: number) {
  if (scale === 0) return amount.toString();

  let isNegative = false;

  let amountInString = String(amount);

  // Negative number
  if (amountInString.charAt(0) == "-") {
    isNegative = true;
    amountInString = amountInString.slice(1);
  }

  amountInString = amountInString.padStart(scale + 1, "0");
  const whole = amountInString.slice(0, -scale).replace(/^0+/, "") || "0";
  const fractional = amountInString.slice(-scale).replace(/0+$/, "");

  const finalNumber = fractional ? `${whole}.${fractional}` : whole;
  return (isNegative ? "-" : "") + finalNumber;
}

export const calc = {
  toScaled,
  fromScaled,
};
