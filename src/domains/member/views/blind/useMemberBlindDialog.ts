import { BlindModel } from '@/data/common'
import { TextFieldProps } from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { MembersApi } from '../../data'

export const useMemberBlindDialog = (
  id: string,
  onClose: () => void,
  onSuccess?: (res: any) => void,
  onFailure?: (error: any) => void,
) => {
  // 정지기간
  const [period, setPeriod] = useState('')
  const periodItems = [
    {
      value: '7',
      label: '7일',
    },
    {
      value: '14',
      label: '14일',
    },
    {
      value: '21',
      label: '21일',
    },
    {
      value: '30',
      label: '30일 (약 1달)',
    },
    {
      value: '60',
      label: '60일 (약 2달)',
    },
    {
      value: '90',
      label: '90일 (약 3달)',
    },
  ]

  const [reason, setReason] = useState('')
  const reasonTextFieldProps: TextFieldProps = {
    value: reason,
    onChange: e => setReason(e.target.value),
    placeholder: '정지 사유 입력',
  }

  const fetchMemberResponse = useQuery(['member', id], () =>
    MembersApi.findOne(id),
  )

  const { data: member } = fetchMemberResponse
  const { mutate } = useMutation(
    'blind-member',
    ({ id, endedAt, reason }: any) =>
      MembersApi.blind(id, new BlindModel(reason, endedAt)),
  )

  // button
  const buttonDisabled = !period || !reason
  const handleButtonClick = () => {
    mutate(
      { id, endedAt: moment().add(period, 'days').toDate(), reason },
      {
        onSuccess: onSuccess,
        onError: onFailure,
      },
    )
  }

  const handleCancelClick = () => onClose()

  return {
    data: {
      noticeText: `${member?.nickname}(${member?.name}) 님의 활동을 다음 기간 동안 제한합니다.`,
      warningText: '※ 활동 정지된 회원은 앱 이용이 불가능합니다.',
      periodState: {
        items: periodItems,
        value: period,
        onChange: (v: string) => setPeriod(v),
      },
      reasonTextFieldProps,
      buttonState: {
        disabled: buttonDisabled,
        onClick: handleButtonClick,
      },
      handleCancelClick,
    },
  }
}
