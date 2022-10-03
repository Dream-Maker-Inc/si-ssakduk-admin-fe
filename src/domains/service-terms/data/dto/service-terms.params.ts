import { PaginationRequest } from '@/data/common'

export type ServiceTermsParams = {
  keyword: string
  withDeleted?: boolean
} & PaginationRequest
