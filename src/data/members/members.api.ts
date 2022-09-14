import { MemberEntity, MembersEntity } from '@/domains/member/models'
import axios from 'axios'
import { plainToClass } from 'class-transformer'
import { ServerInfo, TempToken } from 'env'
import { from, lastValueFrom, map, tap } from 'rxjs'
import { BaseServerClient } from '../common'
import { MembersParams } from './dto'
export class MembersApi {
  static async findAll(params: MembersParams) {
    return lastValueFrom(
      from(
        BaseServerClient.get<MembersEntity>('/api/v1/member', { params }),
      ).pipe(map(res => plainToClass(MembersEntity, res.data))),
    )
  }

  static async findAllByRemoved(params: MembersParams) {
    return lastValueFrom(
      from(
        BaseServerClient.get<MembersEntity>('/api/v1/member/removed', {
          params,
          headers: {
            Authorization: 'Bearer ' + TempToken,
          },
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

  static async ban(id: string, suspendedAt: Date) {
    const res = await axios.patch(
      `${ServerInfo.host}/api/v1/member/${id}/ban`,
      { id, suspendedAt },
      {
        headers: {
          Authorization: 'Bearer ' + TempToken,
        },
      },
    )
    return res.data
  }
}
