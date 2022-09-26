import { PaginationRequest } from '@/data/common'

export type PostingsParams = {
  category: string
  keyword: string
  withBlind?: boolean
} & PaginationRequest
