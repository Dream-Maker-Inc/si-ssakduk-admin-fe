import { MemberEntity } from '@/domains/member/models'
import { Type } from 'class-transformer'
import { PostingEntity } from './posting.entity'

export class PostingDetailEntity {
  @Type(() => PostingEntity)
  posting: PostingEntity

  @Type(() => MemberEntity)
  member: MemberEntity
  likedCount: number
  commentCount: number
}
