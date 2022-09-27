import { PaginationResponse } from '@/data/common'
import { Type } from 'class-transformer'
import { CommentDto } from './comment.dto'

export class CommentsDto {
  @Type(() => CommentDto)
  items: CommentDto[]

  @Type(() => PaginationResponse)
  metaData: PaginationResponse
}
