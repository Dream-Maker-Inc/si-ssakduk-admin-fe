import { PaginationResponse } from '@/data/common'
import { Type } from 'class-transformer'
import { LifePostingEntity } from './life-posting.entity'

export class LifePostingsEntity {
  @Type(() => LifePostingEntity)
  items: LifePostingEntity[]

  @Type(() => PaginationResponse)
  metaData: PaginationResponse
}
