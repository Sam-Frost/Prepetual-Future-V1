export class UserBalance {
  collateral: number;
  balance: number;
  userId: number;

  constructor(userId: number) {
    this.userId = userId;
    this.balance = 0;
    this.collateral = 0;
  }
}
