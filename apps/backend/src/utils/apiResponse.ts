export class ApiResponse {
  success: boolean;
  data: unknown;
  message: string;
  constructor(success: boolean, data: unknown, message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}
