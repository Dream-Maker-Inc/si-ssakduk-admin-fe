import { BaseServerClient } from '@/data/common'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import { LifePostingsEntity } from '../models/life-postings.entity'
import { LifePostingsParams } from './dto'
import { CreateLifePostingDto } from './dto/create-life-posting.dto'

export class LifePostingApi {
  static async findAll(params: LifePostingsParams) {
    return lastValueFrom(
      from(
        BaseServerClient.get<LifePostingsEntity>('/api/v1/life-posting', {
          params: { ...params, withDeleted: true },
        }),
      ).pipe(map(res => plainToClass(LifePostingsEntity, res.data))),
    )
  }

  static async create(dto: CreateLifePostingDto) {
    return lastValueFrom(
      from(
        BaseServerClient.post('/api/v1/life-posting', dto.toFormData()),
      ).pipe(map(res => res.data)),
    )
  }
}
