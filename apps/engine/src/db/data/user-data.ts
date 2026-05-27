import { PositionData } from "./position-data";

export class UserData {
  collateral: string;
  balance: string;
  userId: string;
  position: Map<string, PositionData>; // Position per market

  constructor(userId: string) {
    this.userId = userId;
    this.balance = "0";
    this.collateral = "0";
    this.position = new Map();
  }
}
