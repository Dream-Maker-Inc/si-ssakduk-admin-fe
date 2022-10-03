import { PaginationResponse } from '@/data/common'
import { Type } from 'class-transformer'
import { ServiceTermDto } from './service-term.dto'

export class ServiceTermsDto {
  @Type(() => ServiceTermDto)
  items: ServiceTermDto[]

  @Type(() => PaginationResponse)
  metaData: PaginationResponse
}
