export class ApiResponse {
  success: boolean;
  data: unknown;
  message: string;
  constructor(data: unknown, message: string, success: boolean = true) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}
