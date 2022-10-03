import { BaseServerClient } from '@/data/common'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import {
  CreateServiceTermDto,
  ServiceTermsDto,
  ServiceTermsParams,
} from './dto'

export class ServiceTermsApi {
  static async findAll(params: ServiceTermsParams) {
    return await lastValueFrom(
      from(
        BaseServerClient.get('/api/admin/v1/service-terms', { params }),
      ).pipe(map(res => plainToClass(ServiceTermsDto, res.data))),
    )
  }

  static async create(dto: CreateServiceTermDto) {
    return lastValueFrom(
      from(BaseServerClient.post('/api/admin/v1/service-terms', dto)).pipe(
        map(res => res.data),
      ),
    )
  }
}
