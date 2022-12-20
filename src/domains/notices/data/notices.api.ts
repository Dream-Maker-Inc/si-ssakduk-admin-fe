import { BaseServerClient } from '@/data/common'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import { NoticesParams } from './dto'
import { NoticesDto } from './dto/notices.dto'

export class NoticesApi {
  static async findAll(params: NoticesParams) {
    return await lastValueFrom(
      from(BaseServerClient.get('/api/v1/notice', { params })).pipe(
        map(res => plainToClass(NoticesDto, res.data.data)),
      ),
    )
  }
}
