import axios from 'axios'
import { ServerInfo } from 'env'
import { MemberDto, MembersDto, MembersParams } from './dto'

export class MembersApi {
  static async findAll(params: MembersParams) {
    const res = await axios.get<MembersDto>(
      `${ServerInfo.host}/api/v1/member`,
      { params },
    )

    return res.data
  }

  static async findOne(id: string): Promise<MemberDto> {
    const res = await axios.get<MemberDto>(
      `${ServerInfo.host}/api/v1/member/${id}`,
    )

    const { data } = res

    return {
      ...data,
      suspendedAt: new Date(data.suspendedAt),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.createdAt),
      deletedAt: new Date(data.createdAt),
    }
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
