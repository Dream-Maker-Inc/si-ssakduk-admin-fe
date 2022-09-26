import { PaginationResponse } from '@/data/common'
import { Type } from 'class-transformer'
import { PostingDto } from './posting.dto'

export class PostingsDto {
  @Type(() => PostingDto)
  items: PostingDto[]

  @Type(() => PaginationResponse)
  metaData: PaginationResponse
}
