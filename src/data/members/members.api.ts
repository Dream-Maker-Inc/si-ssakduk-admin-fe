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

  static async findOne(id: number): Promise<MemberDto> {
    const res = await axios.get<MemberDto>(
      `${ServerInfo.host}/api/v1/member/${id}`,
    )

    const { data } = res

    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.createdAt),
      deletedAt: new Date(data.createdAt),
    }
  }
}
