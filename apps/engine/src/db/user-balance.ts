import { calc, MONEY_SCALE } from "types";
import { DatabaseError } from "../util/database-error";
import { UserBalanceData } from "./data/user-balance-data";

export class UserBalance {
  private data: UserBalanceData[] = [];
  constructor() {}

  getUserBalance(userId: number) {
    for (const entry of this.data) {
      if (entry.userId == userId) {
        return calc.toScaled(entry.balance, MONEY_SCALE);
      }
    }
    throw new DatabaseError("User not found in database");
  }

  createUserBalance(userId: number) {
    for (const entry of this.data) {
      if (entry.userId == userId) {
        throw new DatabaseError("User balance already eixst!");
      }
    }
    this.data.push(new UserBalanceData(userId));
  }

  increaseUserBalance(userId: number, amount: string) {
    for (const entry of this.data) {
      if (entry.userId == userId) {
        const userBalance = calc.toScaled(entry.balance, MONEY_SCALE);
        const incrementAmount = calc.toScaled(amount, MONEY_SCALE);

        entry.balance = calc.fromScaled(
          userBalance + incrementAmount,
          MONEY_SCALE,
        );

        return entry.balance;
      }
    }
    throw new DatabaseError("User not found in database");
  }

  decreaseUserBalance(userId: number, amount: string) {
    for (const entry of this.data) {
      if (entry.userId == userId) {
        const userBalance = calc.toScaled(entry.balance, MONEY_SCALE);
        const decrementAmount = calc.toScaled(amount, MONEY_SCALE);

        if (userBalance - decrementAmount < 0) {
          throw new DatabaseError(
            "Cannot decrease balance, it is going below 0",
          );
        }
        entry.balance = calc.fromScaled(
          userBalance - decrementAmount,
          MONEY_SCALE,
        );
        return;
      }
    }
    throw new DatabaseError("User not found in database");
  }
}
