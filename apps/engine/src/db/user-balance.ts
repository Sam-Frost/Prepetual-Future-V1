import { DatabaseError } from "../util/database-error";
import { UserBalanceData } from "./data/user-balance-data";

export class UserBalance {
  private data: UserBalanceData[] = [];
  constructor() {}

  getUserBalance(userId: number) {
    for (const entry of this.data) {
      if (entry.userId == userId) {
        return entry;
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

  increaseUserBalance(userId: number, amount: number) {
    for (const entry of this.data) {
      if (entry.userId == userId) {
        entry.balance += amount;
        return entry.balance;
      }
    }
    throw new DatabaseError("User not found in database");
  }

  decreaseUserBalance(userId: number, amount: number) {
    for (const entry of this.data) {
      if (entry.userId == userId) {
        if (entry.balance - amount < 0) {
          throw new DatabaseError(
            "Cannot decrease balance, it is going below 0",
          );
        }
        entry.balance -= amount;
        return;
      }
    }
    throw new DatabaseError("User not found in database");
  }
}
