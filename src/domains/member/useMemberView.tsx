import { RouterPath } from '@/common/router'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const useMemberView = () => {
  const router = useRouter()

  const dataTableModel = {
    headers: [
      {
        minWidth: '100px',
        width: '100px',
        typographyProps: {
          children: '번호',
        },
      },
      {
        minWidth: '200px',
        width: '200px',
        typographyProps: {
          children: '이름',
        },
      },
      {
        minWidth: '200px',
        width: '200px',
        typographyProps: {
          children: '닉네임',
        },
      },
      {
        typographyProps: {
          children: '가입일',
        },
      },
    ],
    data: [
      ['1', '홍길동', 'gdhong', '2022. 12. 11.'],
      ['2', '홍길동', 'gdhong', '2022. 12. 11.'],
      ['3', '홍길동', 'gdhong', '2022. 12. 11.'],
    ],
  }

  const handleDataRowClick = (id: number) => {
    router.push(`${RouterPath.Members.path}/${id}`)
  }

  // searchBar
  const [keyword, setKeyword] = useState('')
  const handleKeywordChange = (v: string) => setKeyword(v)
  const handleKeywordSubmit = () => {
    alert(keyword)
  }

  return {
    dataTableModel,
    handleDataRowClick,
    keywordState: {
      value: keyword,
      onChange: handleKeywordChange,
      onSubmit: handleKeywordSubmit,
    },
  }
}
