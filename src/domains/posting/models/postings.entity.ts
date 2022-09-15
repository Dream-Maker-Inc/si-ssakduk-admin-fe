import { PaginationResponse } from '@/data/common'
import { MemberEntity } from '@/domains/member/models'
import { Type } from 'class-transformer'
import { PostingEntity } from './posting.entity'

export class PostingsEntity {
  @Type(() => Items)
  items: Items[]

  @Type(() => PaginationResponse)
  metaData: PaginationResponse
}

class Items {
  @Type(() => PostingEntity)
  posting: PostingEntity

  @Type(() => MemberEntity)
  member: MemberEntity

  likedCount: number
  commentCount: number
}
