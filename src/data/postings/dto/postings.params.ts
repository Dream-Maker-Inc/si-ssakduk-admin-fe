import { PaginationRequest } from '@/data/common'
import { PostingCategory } from '@/domains/posting/models'

export type PostingsParams = {
  category: PostingCategory
  keyword: string
} & PaginationRequest
