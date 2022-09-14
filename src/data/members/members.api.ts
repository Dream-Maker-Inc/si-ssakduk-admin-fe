import { MemberEntity, MembersEntity } from '@/domains/member/models'
import axios from 'axios'
import { plainToClass } from 'class-transformer'
import { ServerInfo } from 'env'
import { from, lastValueFrom, map, tap } from 'rxjs'
import { BaseServerClient } from '../common'
import { MembersParams } from './dto'
export class MembersApi {
  static async findAll(params: MembersParams) {
    return lastValueFrom(
      from(
        BaseServerClient.get<MembersEntity>('/api/v1/member', {
          params,
        }),
      ).pipe(
        map(res => plainToClass(MembersEntity, res.data)),
        tap(ok => console.log(ok)),
      ),
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
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYzMDYyMjM0LCJleHAiOjE2NjU2NTQyMzR9.9cfLvDTFvvJTYUlEyrApIiS6e_iN-nVIN-TVXq49gbY',
        },
      },
    )
    return res.data
  }
}
