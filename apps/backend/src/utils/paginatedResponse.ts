export class PaginatedApiResponse {
  data: unknown[];
  pageNumber: number;
  pageSize: number;
  constructor(data: unknown[], pageNumber: number, pageSize: number) {
    this.data = data;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
