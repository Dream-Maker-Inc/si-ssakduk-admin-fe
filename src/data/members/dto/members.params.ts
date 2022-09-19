import { PaginationRequest } from '@/data/common'

export type MembersParams = {
  keyword: string
  withBlind?: boolean
} & PaginationRequest
