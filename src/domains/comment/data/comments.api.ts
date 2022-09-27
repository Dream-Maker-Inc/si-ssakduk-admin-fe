import { BaseServerClient } from '@/data/common'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import { CommentsDto, CommentsParams, ModifyCommentDto } from './dto'

export class CommentsApi {
  static async findAll(params: CommentsParams) {
    return lastValueFrom(
      from(BaseServerClient.get('/api/admin/v1/comment', { params })).pipe(
        map(res => plainToClass(CommentsDto, res.data)),
      ),
    )
  }

  static async modify(id: number, dto: ModifyCommentDto) {
    return await BaseServerClient.patch(`/api/admin/v1/comment/${id}`, dto)
  }
}
