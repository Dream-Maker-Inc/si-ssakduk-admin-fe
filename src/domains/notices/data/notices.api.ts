import { BaseServerClient } from '@/data/common'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import {
  CreateNoticeDto,
  NoticeDto,
  NoticesParams,
  UpdateNoticeDto,
} from './dto'
import { NoticesDto } from './dto/notices.dto'

export class NoticesApi {
  static async findAll(params: NoticesParams) {
    return await lastValueFrom(
      from(BaseServerClient.get('/api/v1/notice', { params })).pipe(
        map(res => plainToClass(NoticesDto, res.data.data)),
      ),
    )
  }

  static async findOne(id: number) {
    return await lastValueFrom(
      from(BaseServerClient.get(`/api/v1/notice/${id}`)).pipe(
        map(res => plainToClass(NoticeDto, res.data.data)),
      ),
    )
  }

  //
  static async create(dto: CreateNoticeDto) {
    return lastValueFrom(
      from(BaseServerClient.post('/api/v1/notice', dto)).pipe(
        map(res => res.data.data),
      ),
    )
  }

  static async update(id: number, dto: UpdateNoticeDto) {
    return lastValueFrom(
      from(BaseServerClient.patch(`/api/v1/notice/${id}`, dto)).pipe(
        map(res => res.data.data),
      ),
    )
  }

  static async remove(id: number) {
    return lastValueFrom(
      from(BaseServerClient.delete(`/api/v1/notice/${id}`)).pipe(
        map(res => res.data.data),
      ),
    )
  }
}
