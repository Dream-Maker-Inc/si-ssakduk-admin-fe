import { BaseServerClient, BlindModel } from '@/data/common'
import { plainToClass } from 'class-transformer'
import { from, lastValueFrom, map } from 'rxjs'
import { MembersParams } from './dto'
import { MemberDto } from './dto/member.dto'
import { MembersDto } from './dto/members.dto'
export class MembersApi {
  static async findAll(params: MembersParams) {
    return lastValueFrom(
      from(
        BaseServerClient.get<MembersDto>('/api/admin/v1/member', {
          params: { ...params, withBlind: true },
        }),
      ).pipe(map(res => plainToClass(MembersDto, res.data))),
    )
  }

  static async findAllByRemoved(params: MembersParams) {
    return lastValueFrom(
      from(
        BaseServerClient.get('/api/admin/v1/member/removed', {
          params,
        }),
      ).pipe(map(res => plainToClass(MembersDto, res.data))),
    )
  }

  static async findOne(id: string) {
    return lastValueFrom(
      from(BaseServerClient.get<MemberDto>(`/api/v1/member/${id}`)).pipe(
        map(res => plainToClass(MemberDto, res.data)),
      ),
    )
  }

  static async blind(id: string, blind: BlindModel) {
    const res = await BaseServerClient.patch(`/api/admin/v1/member/${id}`, {
      blind,
    })
    return res.data
  }

  static async blindCancel(id: string) {
    const res = await BaseServerClient.patch(`/api/admin/v1/member/${id}`, {
      blind: null,
    })
    return res.data
  }
}
