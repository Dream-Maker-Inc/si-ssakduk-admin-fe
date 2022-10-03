import { BaseServerClient } from '@/data/common'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import {
  CreateServiceTermDto,
  ServiceTermDto,
  ServiceTermsDto,
  ServiceTermsParams,
  UpdateServiceTermDto,
} from './dto'

export class ServiceTermsApi {
  static async findAll(params: ServiceTermsParams) {
    return await lastValueFrom(
      from(
        BaseServerClient.get('/api/admin/v1/service-terms', { params }),
      ).pipe(map(res => plainToClass(ServiceTermsDto, res.data))),
    )
  }

  static async findOne(id: number) {
    return await lastValueFrom(
      from(BaseServerClient.get(`/api/admin/v1/service-terms/${id}`)).pipe(
        map(res => plainToClass(ServiceTermDto, res.data)),
      ),
    )
  }

  static async create(dto: CreateServiceTermDto) {
    return lastValueFrom(
      from(BaseServerClient.post('/api/admin/v1/service-terms', dto)).pipe(
        map(res => res.data),
      ),
    )
  }

  static async update(id: number, dto: UpdateServiceTermDto) {
    return lastValueFrom(
      from(
        BaseServerClient.patch(`/api/admin/v1/service-terms/${id}`, dto),
      ).pipe(map(res => res.data)),
    )
  }

  static async remove(id: number) {
    return lastValueFrom(
      from(BaseServerClient.delete(`/api/admin/v1/service-terms/${id}`)).pipe(
        map(res => res.data),
      ),
    )
  }
}
