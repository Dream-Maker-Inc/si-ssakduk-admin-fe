import { PaginationResponse } from '@/data/common'
import { MemberEntity } from '@/domains/member/models'
import { Type } from 'class-transformer'

export class MembersEntity {
  @Type(() => MemberEntity)
  items: MemberEntity[]

  @Type(() => PaginationResponse)
  metaData: PaginationResponse
}
