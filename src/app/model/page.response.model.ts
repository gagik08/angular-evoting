export interface PageResponse<DTO>{
  content: DTO[],
  number: number,
  totalPage:number,
  pageSize: number
}
