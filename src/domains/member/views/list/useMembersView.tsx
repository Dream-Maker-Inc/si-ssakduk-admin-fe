import { DataTableProps } from '@/common/components/DataTable'
import { SearchDialogProps } from '@/common/components/dialogs'
import { membersSearchAtom } from '@/common/recoil'
import { RouterPath } from '@/common/router'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { MemberDto, MembersApi, MembersDto } from '../../data'

const PageSize = 10

export const useMembersView = () => {
  const router = useRouter()

  const [pageNumber, setPageNumber] = useState(1)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  const [membersSearchState, setMembersSearchState] =
    useRecoilState(membersSearchAtom)
  const { keyword, mode } = membersSearchState

  const handleKeywordChange = (v: string) =>
    setMembersSearchState({ ...membersSearchState, keyword: v })
  const handleSearchModeChange = (value: string) =>
    setMembersSearchState({ ...membersSearchState, mode: value })

  // fetch members
  const { data: membersDto, refetch } = useQuery(
    ['members', pageNumber],
    () => {
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

  const result = { data: null }
  if (!membersDto) return result

  //
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
      onSubmit: () => refetch(),
    },
  }

  // pagination
  const count = metaData.totalPageCount ?? 0
  const handleChangePageNumber = (page: number) => setPageNumber(page)

  // breadcrumbs
  const breadcrumbModels = [
    {
      displayName: '회원 관리',
      path: RouterPath.Members.path,
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
