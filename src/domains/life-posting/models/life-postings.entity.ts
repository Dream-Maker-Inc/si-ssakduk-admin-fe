import { PaginationResponse2 } from '@/data/common'
import { Type } from 'class-transformer'
import { LifePostingEntity } from './life-posting.entity'

export class LifePostingsEntity {
  @Type(() => LifePostingEntity)
  items: LifePostingEntity[]

  @Type(() => PaginationResponse2)
  metaData: PaginationResponse2
}
