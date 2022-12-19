import { BaseServerClient } from '@/data/common'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import { PostingDto, PostingsDto, PostingsParams } from './dto'
import { ModifyPostingDto } from './dto/modify-posting.dto'

export class PostingsApi {
  static async findAll(params: PostingsParams) {
    return await lastValueFrom(
      from(BaseServerClient.get('/api/admin/v1/posting', { params })).pipe(
        map(res => plainToClass(PostingsDto, res.data.data)),
      ),
    )
  }

  static async findOne(id: string) {
    return lastValueFrom(
      from(BaseServerClient.get(`/api/admin/v1/posting/${id}`)).pipe(
        map(res => plainToClass(PostingDto, res.data.data)),
      ),
    )
  }

  static async modify(id: string, dto: ModifyPostingDto) {
    return await BaseServerClient.patch(`/api/admin/v1/posting/${id}`, dto)
  }
}
