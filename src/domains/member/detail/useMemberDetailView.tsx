import { RouterPath } from '@/common/router'
import { MembersApi } from '@/data/members'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useMemberDetailView = (id: string) => {
  const router = useRouter()

  // fetch member
  const {
    isLoading,
    isError,
    data: member,
    error,
  } = useQuery(['member', id], () => MembersApi.findOne(id))

  const result = {
    memberFetchState: {
      isLoading,
      isError,
      error,
    },
    data: null,
  }

  if (!member) return result

  //
  const { Members, Member } = RouterPath
  const breadcrumbModels = [
    {
      displayName: '회원 관리',
      path: Members.path,
    },
    {
      displayName: '회원 상세',
      path: Member.createPath(`${id}`),
    },
  ]

  //
  const handleMemberDelete = () =>
    router.push(RouterPath.MemberDelete.createPath(`${id}`))

  return {
    ...result,
    data: {
      memberData: member,
      breadcrumbModels,
      handleMemberDelete,
    },
  }
}
