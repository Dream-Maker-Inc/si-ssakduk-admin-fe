import { useLifePostingsSearchState } from './../../../../common/recoil/life-postings.atom'
import { LifePostingApi } from './../../data/life-posting.api'
import { useQuery } from 'react-query'
import { DataTableProps } from '@/common/components/DataTable'
import { useRouter } from 'next/router'
import { RouterPath } from '@/common/router'
import { SearchDialogProps } from '@/common/components/dialogs'
import { useEffect, useState } from 'react'
import { CreateActionIconProps } from '@/common/components/icons'
import { LifePostingDto, LifePostingsDto } from '../../data'
import { BreadcrumbModel } from '@/common/components/TitleContainer'

const PageSize = 10

export const useLifePostingsView = () => {
  const router = useRouter()

  const [pageNumber, setPageNumber] = useState(1)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [keywordBuffer, setKeywordBuffer] = useState('')
  const [keyword, setKeyword] = useState('')

  // fetch
  const { data: lifePostingsDto } = useQuery(
    ['life-postings', pageNumber, keyword],
    () =>
      LifePostingApi.findAll({
        page: pageNumber,
        size: PageSize,
        keyword,
      }),
  )

  // effects
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const keyword = params.get('keyword') ?? ''
    setKeywordBuffer(keyword)
    setKeyword(keyword)
  }, [router.asPath])

  // null guard
  const result = { data: null }
  if (!lifePostingsDto) return result

  // mapping
  const { lifePostings, metaData } = mapToLifePosting(lifePostingsDto)

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
        lifePostings.map(it => [
          it.id,
          it.title,
          it.createdAt,
          it.viewCount,
          it.stateText,
        ]) ?? [],
    },
    onDataRowClick: (id: number) =>
      router.push(RouterPath.LifePosting.createPathWithId(`${id}`)),
  }

  // searchDialog props
  const searchDialogProps: SearchDialogProps = {
    open: searchDialogOpen,
    onClose: () => setSearchDialogOpen(false),
    filterModel: {},
    keywordState: {
      value: keywordBuffer,
      onChange: setKeywordBuffer,
      onSubmit: () => {
        setSearchDialogOpen(false)
        router.push(`${router.pathname}`, { query: { keyword: keywordBuffer } })
      },
    },
  }

  // create action icon props
  const createActionIconProps: CreateActionIconProps = {
    tooltip: '글 작성',
    iconButtonProps: {
      onClick: () => router.push(RouterPath.LifePostingCreate.path),
    },
  }

  // pagination
  const paginationState = {
    count: metaData.totalPageCount,
    page: pageNumber,
    onChange: (page: number) => setPageNumber(page),
  }

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '라이프 관리',
      path: RouterPath.LifePostings.path,
      accent: true,
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

//
const mapToLifePosting = (dto: LifePostingsDto) => {
  const { items, metaData } = dto

  const getStateText = (dto: LifePostingDto) =>
    !!dto.deletedDate ? '삭제' : '공개'

  const lifePostings = items.map(it => ({
    id: it.id,
    title: it.title,
    createdAt: it.createdDate.toLocaleString(),
    viewCount: it.viewCount,
    stateText: getStateText(it),
  }))

  return {
    lifePostings,
    metaData,
  }
}
