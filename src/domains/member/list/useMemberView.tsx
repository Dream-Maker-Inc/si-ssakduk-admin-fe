import { RouterPath } from '@/common/router'
import { MembersApi } from '@/data/members'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'

const PageSize = 10

export const useMemberView = () => {
  const router = useRouter()

  const [pageNumber, setPageNumber] = useState(1)
  const [searchWord, setSearchWord] = useState('')

  // fetch members
  const { isLoading, isError, data, error } = useQuery(
    ['members', pageNumber, searchWord],
    () =>
      MembersApi.findAll({
        page: pageNumber,
        size: PageSize,
        keyword: searchWord,
      }),
  )

  // table
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
        minWidth: '300px',
        width: '300px',
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
      {
        minWidth: '200px',
        width: '200px',
        typographyProps: {
          children: '정지 여부',
        },
      },
    ],
    data:
      data?.items?.map(it => [
        it.id,
        it.name,
        it.nickname,
        it.createdDate.toLocaleString(),
        it.suspendedText,
      ]) ?? [],
  }

  const handleDataRowClick = (id: number) =>
    router.push(RouterPath.Member.createPath(`${id}`))

  // searchBar
  const [keyword, setKeyword] = useState('')
  const handleKeywordChange = (v: string) => setKeyword(v)
  const handleKeywordSubmit = () => setSearchWord(keyword)

  // pagination
  const count = data?.metaData?.totalPageCount
  const handleChangePageNumber = (page: number) => setPageNumber(page)

  // breadcrumbs
  const breadcrumbModels = [
    {
      displayName: '회원 관리',
      path: RouterPath.Members.path,
    },
  ]

  return {
    membersFetchState: {
      isLoading,
      isError,
      error,
    },
    dataTableModel,
    handleDataRowClick,
    keywordState: {
      value: keyword,
      onChange: handleKeywordChange,
      onSubmit: handleKeywordSubmit,
    },
    paginationState: {
      count,
      page: pageNumber,
      onChange: handleChangePageNumber,
    },
    breadcrumbModels,
  }
}
