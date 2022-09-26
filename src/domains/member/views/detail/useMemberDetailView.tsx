import { RouterPath } from '@/common/router'
import { MemberDto } from '@/domains/member/data/dto/member.dto'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { MembersApi } from '../../data'
import { MemberBlindDialogProps } from '../blind'

export const useMemberDetailView = (id: string) => {
  const [memberBlindDialogOpen, setMemberBlindDialogOpen] = useState(false)

  // fetch member
  const {
    isLoading,
    isError,
    data: memberDto,
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

  if (!memberDto) return result

  //
  const member = mapToMember(memberDto)

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
      member,
      breadcrumbModels,
      memberDeleteDialogProps: memberBlindDialogProps,
      blockOptionIconProps,
    },
  }
}

//
const mapToMember = (dto: MemberDto) => {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    profileImage: dto.profileImage,
    createdAt: dto.createdDate.toLocaleDateString(),
    isBlock: dto.isBlind,
    blockedText: dto.isBlind
      ? `활동 정지 (~ ${
          dto.blind?.endedDate?.toLocaleString() ?? '무기한'
        })\n정지 사유 (${dto.blind.reason})`
      : '활동 중 (정상)',
    leavedText: dto.deletedDate
      ? `탈퇴 (${dto.deletedDate?.toLocaleString()})`
      : '활동 중 (정상)',
  }
}
