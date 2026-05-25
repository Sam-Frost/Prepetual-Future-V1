export class UserBalanceData {
  collateral: string;
  balance: string;
  userId: number;

  constructor(userId: number) {
    this.userId = userId;
    this.balance = "0";
    this.collateral = "0";
  }
}
