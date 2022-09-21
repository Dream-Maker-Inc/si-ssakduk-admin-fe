import { RouterPath } from '@/common/router'
import { MembersApi } from '@/data/members'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { MemberBlindDialogProps } from '../blind'

export const useMemberDetailView = (id: string) => {
  const [memberBlindDialogOpen, setMemberBlindDialogOpen] = useState(false)

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
  const memberBlindDialogProps: MemberBlindDialogProps = {
    open: memberBlindDialogOpen,
    onClose: () => setMemberBlindDialogOpen(false),
    memberId: id,
    onSuccess: () => {
      const message = member.isBlock
        ? '해당 회원의 활동 정지를 해제했습니다.'
        : '해당 회원의 활동을 정지시켰습니다.'
      alert(message)
      setMemberBlindDialogOpen(false)
    },
    onFailure: err => {
      alert('요청 처리를 실패했습니다.')
      console.error(err)
    },
  }

  const blockOptionIconProps = {
    isBlock: member.isBlock,
    tooltip: member.isBlock ? '활동 정지 해제' : '활동 정지하기',
    onToggle: () => setMemberBlindDialogOpen(true),
  }

  return {
    ...result,
    data: {
      memberData: member,
      breadcrumbModels,
      memberDeleteDialogProps: memberBlindDialogProps,
      blockOptionIconProps,
    },
  }
}
