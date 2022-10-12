import { BaseServerClient } from '@/data/common'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map, tap } from 'rxjs'
import { LifePostingDto, LifePostingsDto, LifePostingsParams } from './dto'
import { CreateLifePostingDto } from './dto/create-life-posting.dto'
import { UpdateLifePostingDto } from './dto/update-life-posting.dto'

export class LifePostingApi {
  static async findAll(params: LifePostingsParams) {
    return lastValueFrom(
      from(
        BaseServerClient.get('/api/admin/v1/life-posting', {
          params,
        }),
      ).pipe(map(res => plainToClass(LifePostingsDto, res.data))),
    )
  }

  static async findOne(id: number) {
    return lastValueFrom(
      from(BaseServerClient.get(`/api/admin/v1/life-posting/${id}`)).pipe(
        tap(res => {
          if (res.data.statusCode) {
            throw new Error(res.data.message)
          }
        }),
        map(res => plainToClass(LifePostingDto, res.data)),
      ),
    )
  }

  static async create(dto: CreateLifePostingDto) {
    return lastValueFrom(
      from(
        BaseServerClient.post('/api/admin/v1/life-posting', dto.toFormData()),
      ).pipe(map(res => res.data)),
    )
  }

  static async update(id: number, dto: UpdateLifePostingDto) {
    return lastValueFrom(
      from(
        BaseServerClient.patch(
          `/api/admin/v1/life-posting/${id}`,
          dto.toFormData(),
        ),
      ).pipe(map(res => res.data)),
    )
  }

  static async delete(id: number) {
    return lastValueFrom(
      from(BaseServerClient.delete(`/api/admin/v1/life-posting/${id}`)).pipe(
        map(res => res.data),
      ),
    )
  }
}
