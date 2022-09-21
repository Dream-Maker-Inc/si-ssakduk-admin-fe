import { PostingDetailEntity, PostingsEntity } from '@/domains/posting/models'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import { BaseServerClient } from '../common'
import { PostingsParams } from './dto'
import { ModifyPostingDto } from './dto/modify-posting.dto'

export class PostingsApi {
  static async findAll(params: PostingsParams) {
    return lastValueFrom(
      from(
        BaseServerClient.get<PostingsEntity>('/api/v1/posting', { params }),
      ).pipe(map(res => plainToClass(PostingsEntity, res.data))),
    )
  }

  static async findOne(id: string): Promise<PostingDetailEntity> {
    return lastValueFrom(
      from(
        BaseServerClient.get(`/api/v1/posting/${id}`, {
          params: { increaseViewCount: false },
        }),
      ).pipe(map(res => plainToClass(PostingDetailEntity, res.data))),
    )
  }

  static async modify(id: string, dto: ModifyPostingDto) {
    console.log(dto)

    return await BaseServerClient.patch(`/api/v1/posting/${id}/modify`, dto)
  }
}
