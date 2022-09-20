import { PaginationRequest } from '@/data/common'

export type CommentsParams = {
  keyword?: string
  postingId?: string
  authorId?: string
  withBlind?: boolean
} & PaginationRequest
