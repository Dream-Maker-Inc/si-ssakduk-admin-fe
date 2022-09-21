import { MembersApi } from '@/data/members'
import { useMutation, useQuery } from 'react-query'

export const useMemberBlindCancelDialog = (
  id: string,
  onClose: () => void,
  onSuccess?: (res: any) => void,
  onFailure?: (error: any) => void,
) => {
  const fetchMemberResponse = useQuery(['member', id], () =>
    MembersApi.findOne(id),
  )

  const { data: member } = fetchMemberResponse
  const { mutate } = useMutation('blind-cancel-member', ({ id }: any) =>
    MembersApi.blindCancel(id),
  )

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
      noticeText: `${member?.nickname}(${member?.name}) 님의 활동 정지를 해제합니다.`,
      warningText: `${member?.suspendedTextWithDate}`,
      handleButtonClick,
      handleCancelClick,
    },
  }
}
