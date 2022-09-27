import { PaginationResponse } from '@/data/common'
import { Type } from 'class-transformer'
import { LifePostingDto } from './life-posting.dto'

export class LifePostingsDto {
  @Type(() => LifePostingDto)
  items: LifePostingDto[]

  @Type(() => PaginationResponse)
  metaData: PaginationResponse
}
