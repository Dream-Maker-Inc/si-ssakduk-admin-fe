import { BaseServerClient } from '@/data/common'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import { LifePostingsEntity } from '../models/life-postings.entity'
import { LifePostingsParams } from './dto'

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
}
