import { PaginationResponse } from '@/data/common'
import { Type } from 'class-transformer'
import { MemberDto } from './member.dto'

export class MembersDto {
  @Type(() => MemberDto)
  items: MemberDto[]

  @Type(() => PaginationResponse)
  metaData: PaginationResponse
}
