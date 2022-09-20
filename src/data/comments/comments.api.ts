import { CommentsEntity } from '@/domains/comment'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import { BaseServerClient } from '../common'
import { CommentsParams } from './dto'
import { BlindCommentDto } from './dto/blind-comment.dto'

export class CommentsApi {
  static async findAll(params: CommentsParams) {
    return lastValueFrom(
      from(
        BaseServerClient.get<CommentsEntity>('/api/v1/comment', { params }),
      ).pipe(map(res => plainToClass(CommentsEntity, res.data))),
    )
  }

  static async blind(id: number, dto: BlindCommentDto) {
    const res = await BaseServerClient.patch(`/api/v1/comment/${id}/blind`, dto)
    return res.data
  }

  static async cancelBlind(id: number) {
    const res = await BaseServerClient.patch(
      `/api/v1/comment/${id}/cancel-blind`,
    )
    return res.data
  }
}
