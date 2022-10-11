import { DataTableProps } from '@/common/components/DataTable'
import { SearchDialogProps } from '@/common/components/dialogs'
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { membersSearchAtom } from '@/common/recoil'
import { RouterPath } from '@/common/router'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { MemberDto, MembersApi, MembersDto } from '../../data'

const PageSize = 10

export const useMembersView = () => {
  const router = useRouter()

  const [pageNumber, setPageNumber] = useState(1)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  const { queryBuffer, query, handleKeywordChange, handleSearchModeChange } =
    useMembersQuery()
  const { mode, keyword } = queryBuffer

  // fetch members
  const { data: membersDto } = useQuery(
    ['members', pageNumber, query],
    () => {
      const { mode, keyword } = query

      if (mode === '활동 유저')
        return MembersApi.findAll({
          page: pageNumber,
          size: PageSize,
          keyword,
        })

      if (mode === '탈퇴 유저')
        return MembersApi.findAllByRemoved({
          page: pageNumber,
          size: PageSize,
          keyword,
        })
    },
    {
      onSuccess: () => setSearchDialogOpen(false),
    },
  )

  // guard
  const result = { data: null }
  if (!membersDto) return result

  // mapping
  const { members, metaData } = mapToMembers(membersDto)

  // table
  const dataTableProps: DataTableProps = {
    model: {
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
            children: '상태',
          },
        },
      ],
      data:
        members.map(it => [
          it.id,
          it.name,
          it.nickname,
          it.createdAt,
          it.stateText,
        ]) ?? [],
    },
    onDataRowClick: (id: number) =>
      router.push(RouterPath.Member.createPathWithId(`${id}`)),
  }

  // searchDialog props
  const searchDialogProps: SearchDialogProps = {
    open: searchDialogOpen,
    onClose: () => setSearchDialogOpen(false),
    filterModel: {
      selectors: [],
      options: {
        radioGroup: {
          value: mode,
          onChange: handleSearchModeChange,
          items: [
            {
              label: '활동 유저',
              value: '활동 유저',
            },
            {
              label: '탈퇴 유저',
              value: '탈퇴 유저',
            },
          ],
        },
      },
    },
    keywordState: {
      value: keyword,
      onChange: handleKeywordChange,
      onSubmit: () => {
        setSearchDialogOpen(false)
        router.push(`${router.pathname}`, { query: { ...queryBuffer } })
      },
    },
  }

  // pagination
  const count = metaData.totalPageCount ?? 0
  const handleChangePageNumber = (page: number) => setPageNumber(page)

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '회원 관리',
      path: RouterPath.Members.path,
      accent: true,
    },
  ]

  return {
    data: {
      dataTableProps,
      paginationState: {
        count,
        page: pageNumber,
        onChange: handleChangePageNumber,
      },
      breadcrumbModels,
      searchDialogProps,
      openSearchDialog: () => setSearchDialogOpen(true),
    },
  }
}

//
const useMembersQuery = () => {
  const router = useRouter()

  const [queryBuffer, setQueryBuffer] = useState({
    keyword: '',
    mode: '활동 유저',
  })

  const [query, setQuery] = useState({
    keyword: '',
    mode: '활동 유저',
  })

  const handleKeywordChange = (v: string) =>
    setQueryBuffer({ ...queryBuffer, keyword: v })

  const handleSearchModeChange = (v: string) =>
    setQueryBuffer({ ...queryBuffer, mode: v })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const keyword = params.get('keyword') ?? ''
    const mode = params.get('mode') ?? '활동 유저'

    setQueryBuffer({
      keyword,
      mode,
    })

    setQuery({
      keyword,
      mode,
    })
  }, [router.asPath])

  return {
    queryBuffer,
    query,
    handleKeywordChange,
    handleSearchModeChange,
  }
}

//
const mapToMembers = (dto: MembersDto) => {
  const getStateText = (memberDto: MemberDto) => {
    if (!!memberDto.deletedDate) return '탈퇴'
    if (memberDto.isBlind) return '활동 정지'

    return '공개'
  }

  const { items, metaData } = dto

  const members = items.map(it => ({
    id: it.id,
    name: it.name,
    nickname: it.nickname,
    createdAt: it.createdDate.toLocaleString(),
    stateText: getStateText(it),
  }))

  return {
    members,
    metaData,
  }
}
