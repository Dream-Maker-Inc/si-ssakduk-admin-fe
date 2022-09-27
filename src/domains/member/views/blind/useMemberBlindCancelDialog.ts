import { useMutation, useQuery } from 'react-query'
import { MemberDto, MembersApi } from '../../data'

export const useMemberBlindCancelDialog = (
  id: string,
  onClose: () => void,
  onSuccess?: (res: any) => void,
  onFailure?: (error: any) => void,
) => {
  const fetchMemberResponse = useQuery(['member', id], () =>
    MembersApi.findOne(id),
  )

  const { data: memberDto } = fetchMemberResponse
  const { mutate } = useMutation('blind-cancel-member', ({ id }: any) =>
    MembersApi.blindCancel(id),
  )

  const result = { data: null }
  if (!memberDto) return result

  //
  const member = mapToMember(memberDto)

  // button
  const handleButtonClick = () => {
    mutate(
      { id },
      {
        onSuccess: onSuccess,
        onError: onFailure,
      },
    )
  }

  const handleCancelClick = () => onClose()

  return {
    data: {
      noticeText: `${member.nickname}(${member.name}) 님의 활동 정지를 해제합니다.`,
      warningText: `${member.blockedText}`,
      handleButtonClick,
      handleCancelClick,
    },
  }
}

//
const mapToMember = (dto: MemberDto) => {
  return {
    id: dto.id,
    nickname: dto.nickname,
    name: dto.name,
    blockedText: dto.isBlind
      ? `활동 정지 (~ ${
          dto.blind?.endedDate?.toLocaleString() ?? '무기한'
        })\n정지 사유 (${dto.blind.reason})`
      : '활동 중 (정상)',
  }
}
