import { MemberDto } from './member.dto'

interface MembersDto {
  items: MemberDto[]
  metaData: MetaData
}

interface MetaData {
  offset: number
  pageSize: number
  pageNumber: number
  totalPageCount: number
  itemCount: number
  totalItemCount: number
  isFirst: boolean
  isLast: boolean
}

export type { MembersDto }
