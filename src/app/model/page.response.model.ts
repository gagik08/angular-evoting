export interface PageResponse<DTO>{
  content: DTO[],
  number: number,
  totalPages:number,
  pageSize: number
}
