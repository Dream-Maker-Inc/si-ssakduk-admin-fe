import { PaginationResponse2 } from '@/data/common'
import { MemberEntity } from '@/domains/member/models'
import { Type } from 'class-transformer'
import { CommentEntity } from './comment.entity'

export class CommentsEntity {
  @Type(() => Items)
  items: Items[]

  @Type(() => PaginationResponse2)
  metaData: PaginationResponse2
}

class Items {
  @Type(() => CommentEntity)
  comment: CommentEntity

  @Type(() => MemberEntity)
  member: MemberEntity

  likedCount: number
}
