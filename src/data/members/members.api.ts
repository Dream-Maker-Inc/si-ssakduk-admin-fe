import { MemberEntity, MembersEntity } from '@/domains/member/models'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import { BaseServerClient } from '../common'
import { MembersParams } from './dto'
export class MembersApi {
  static async findAll(params: MembersParams) {
    return lastValueFrom(
      from(
        BaseServerClient.get<MembersEntity>('/api/v1/member', {
          params: { ...params, withBlind: true },
        }),
      ).pipe(map(res => plainToClass(MembersEntity, res.data))),
    )
  }

  static async findAllByRemoved(params: MembersParams) {
    return lastValueFrom(
      from(
        BaseServerClient.get<MembersEntity>('/api/v1/member/removed', {
          params,
        }),
      ).pipe(map(res => plainToClass(MembersEntity, res.data))),
    )
  }

  static async findOne(id: string): Promise<MemberEntity> {
    return lastValueFrom(
      from(BaseServerClient.get<MemberEntity>(`/api/v1/member/${id}`)).pipe(
        map(res => plainToClass(MemberEntity, res.data)),
      ),
    )
  }

  static async blind(id: string, endedAt: Date, reason: string) {
    const res = await BaseServerClient.patch(`/api/v1/member/${id}/blind`, {
      id,
      endedAt,
      reason,
    })
    return res.data
  }

  static async blindCancel(id: string) {
    const res = await BaseServerClient.patch(
      `/api/v1/member/${id}/blind-cancel`,
    )
    return res.data
  }
}
