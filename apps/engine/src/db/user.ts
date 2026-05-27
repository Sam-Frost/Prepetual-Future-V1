import { calc, MONEY_SCALE } from "types";
import { DatabaseError } from "../util/database-error";
import { UserData } from "./data/user-data";
export class User {
  private data: UserData[] = [];
  constructor() {}

  getUserBalance(userId: string) {
    for (const entry of this.data) {
      if (entry.userId == userId) {
        return {
          balance: calc.toScaled(entry.balance, MONEY_SCALE),
          collateral: calc.toScaled(entry.collateral, MONEY_SCALE),
        };
      }
    }
    throw new DatabaseError("User not found in database");
  }

  createUserBalance(userId: string) {
    for (const entry of this.data) {
      if (entry.userId == userId) {
        throw new DatabaseError("User balance already eixst!");
      }
    }
    this.data.push(new UserData(userId));
  }

  increaseUserBalance(userId: string, amount: string) {
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

  decreaseUserBalance(userId: string, amount: string) {
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

  getCurrentPosition(userId: string, marketId: string) {
    for (const user of this.data) {
      if (user.userId == userId) {
        const positions = user.position;
        const position = positions.get(marketId);

        if (!position) {
          throw new DatabaseError(
            `User found, but position not present for user id : ${userId} and market id ${marketId}`,
          );
        } else {
          return position;
        }
      }
    }

    throw new DatabaseError(
      `Positions not found for user id : ${userId} and market id ${marketId}`,
    );
  }
}
