import { useLifePostingsSearchState } from './../../../../common/recoil/life-postings.atom'
import { LifePostingApi } from './../../data/life-posting.api'
import { useQuery } from 'react-query'
import { DataTableProps } from '@/common/components/DataTable'
import { useRouter } from 'next/router'
import { RouterPath } from '@/common/router'
import { SearchDialogProps } from '@/common/components/dialogs'
import { useState } from 'react'
import { CreateActionIconProps } from '@/common/components/icons'
const PageSize = 10

export const useLifePostingsView = () => {
  const router = useRouter()

  const [pageNumber, setPageNumber] = useState(1)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  const { keyword, handleKeywordChange } = useLifePostingsSearchState()

  const { data, refetch } = useQuery(['life-postings'], () =>
    LifePostingApi.findAll({
      page: 1,
      size: PageSize,
      keyword,
    }),
  )

  const result = { data: null }
  if (!data) return result

  // table
  const dataTableProps: DataTableProps = {
    model: {
      headers: [
        {
          minWidth: '80px',
          width: '80px',
          typographyProps: { children: '번호' },
        },
        {
          minWidth: '500px',
          width: '500px',
          typographyProps: { children: '제목' },
        },
        {
          minWidth: '300px',
          width: '300px',
          typographyProps: { children: '등록일' },
        },
        {
          minWidth: '100px',
          width: '100px',
          typographyProps: { children: '조회수' },
        },
        {
          minWidth: '100px',
          width: '100px',
          typographyProps: { children: '상태' },
        },
      ],
      data:
        data?.items?.map(it => [
          it.id,
          it.title,
          it.createdDate.toLocaleString(),
          it.viewCount,
          it.stateText,
        ]) ?? [],
    },
    onDataRowClick: (id: number) =>
      router.push(RouterPath.LifePosting.createPath(`${id}`)),
  }

  // searchDialog props
  const searchDialogProps: SearchDialogProps = {
    open: searchDialogOpen,
    onClose: () => setSearchDialogOpen(false),
    filterModel: {},
    keywordState: {
      value: keyword,
      onChange: handleKeywordChange,
      onSubmit: () => {
        refetch()
        setSearchDialogOpen(false)
      },
    },
  }

  // create action icon props
  const createActionIconProps: CreateActionIconProps = {
    tooltip: '글 작성',
    iconButtonProps: {
      onClick: () => router.push(RouterPath.LifePostingCreate.path()),
    },
  }

  // pagination
  const paginationState = {
    count: data?.metaData?.totalPageCount,
    page: pageNumber,
    onChange: (page: number) => setPageNumber(page),
  }

  // breadcrumbs
  const breadcrumbModels = [
    {
      displayName: '라이프 관리',
      path: RouterPath.Postings.path,
    },
  ]

  return {
    data: {
      dataTableProps,
      paginationState,
      breadcrumbModels,
      searchDialogProps,
      openSearchDialog: () => setSearchDialogOpen(true),
      createActionIconProps,
    },
  }
}
