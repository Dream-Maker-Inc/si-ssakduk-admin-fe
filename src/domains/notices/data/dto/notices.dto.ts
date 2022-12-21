import { PaginationResponse } from '@/data/common'
import { Type } from 'class-transformer'
import { NoticeDto } from './notice.dto'

export class NoticesDto {
  @Type(() => NoticeDto)
  items: NoticeDto[]

  @Type(() => PaginationResponse)
  metaData: PaginationResponse
}
