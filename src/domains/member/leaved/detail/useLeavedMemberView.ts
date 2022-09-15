import { RouterPath } from '@/common/router'
import { MembersApi } from '@/data/members'
import { useQuery } from 'react-query'

export const useLeavedMemberView = (id: string) => {
  // fetch member
  const { data: member } = useQuery(['removed-member', id], () =>
    MembersApi.findOne(id),
  )

  const result = { data: null }

  if (!member) return result

  //
  const { LeavedMembers, LeavedMember } = RouterPath
  const breadcrumbModels = [
    {
      displayName: '탈퇴 회원 관리',
      path: LeavedMembers.path,
    },
    {
      displayName: '탈퇴 회원 상세',
      path: LeavedMember.createPath(`${id}`),
    },
  ]

  return {
    ...result,
    data: {
      member,
      breadcrumbModels,
    },
  }
}
