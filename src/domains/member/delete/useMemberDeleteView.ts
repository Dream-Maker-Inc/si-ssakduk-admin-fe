import { RouterPath } from '@/common/router'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const useMemberDeleteView = (id: string) => {
  const router = useRouter()

  // 정지기간
  const [period, setPeriod] = useState('')
  const periodItems = [
    {
      value: 7,
      label: '7일',
    },
    {
      value: 14,
      label: '14일',
    },
    {
      value: 21,
      label: '21일',
    },
    {
      value: 30,
      label: '30일 (약 1달)',
    },
    {
      value: 60,
      label: '60일 (약 2달)',
    },
    {
      value: 90,
      label: '90일 (약 3달)',
    },
  ]
  const handlePeriodChange = (v: string) => setPeriod(v)

  // button
  const buttonDisabled = !period
  const handleButtonClick = () => {
    alert('반영되었습니다.')
    router.push('/member')
  }

  //
  const { Members, Member, MemberDelete } = RouterPath
  const breadcrumbModels = [
    {
      displayName: '회원 관리',
      path: Members.path,
    },
    {
      displayName: '회원 상세',
      path: Member.createPath(id),
    },
    {
      displayName: '회원 활동 정지',
      path: MemberDelete.createPath(id),
    },
  ]

  return {
    data: {
      periodState: {
        items: periodItems,
        value: period,
        onChange: handlePeriodChange,
      },
      buttonState: {
        disabled: buttonDisabled,
        onClick: handleButtonClick,
      },
      breadcrumbModels,
    },
  }
}
