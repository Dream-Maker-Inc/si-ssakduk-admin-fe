import { DataTableProps } from '@/common/components/DataTable'
import { SearchDialogProps } from '@/common/components/dialogs'
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { NoticesApi, NoticesDto } from '../data'

const PageSize = 10

export const useNoticesView = () => {
  const router = useRouter()

  const [pageNumber, setPageNumber] = useState(1)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [keywordBuffer, setKeywordBuffer] = useState('')
  const [keyword, setKeyword] = useState('')

  // fetch notices
  const { data: noticesDto } = useQuery(
    ['notices', pageNumber, keyword],
    () => {
      return NoticesApi.findAll({
        page: pageNumber,
        size: PageSize,
        keyword,
      })
    },
  )

  // effects
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const keyword = params.get('keyword') ?? ''
    setKeywordBuffer(keyword)
    setKeyword(keyword)
  }, [router.asPath])

  // guard
  const result = { data: null }
  if (!noticesDto) return result

  const { notices, metaData } = mapToNotices(noticesDto)

  // table
  const dataTableProps: DataTableProps = {
    model: {
      headers: [
        {
          minWidth: '80px',
          width: '80px',
          typographyProps: {
            children: '번호',
          },
        },
        {
          minWidth: '300px',
          width: '300px',
          typographyProps: {
            children: '제목',
          },
        },
        {
          typographyProps: {
            children: '내용',
          },
        },
        {
          minWidth: '300px',
          width: '300px',
          typographyProps: {
            children: '생성일',
          },
        },
        {
          minWidth: '300px',
          width: '300px',
          typographyProps: {
            children: '수정일',
          },
        },
      ],
      data:
        notices.map(it => [
          it.id,
          it.title,
          it.content,
          it.createdAt,
          it.updateAt,
        ]) ?? [],
    },
    onDataRowClick: (id: number) =>
      router.push(RouterPath.NoticeCreate.createPathWithId(`${id}`)),
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

  // pagination
  const paginationState = {
    count: metaData.totalPageCount,
    page: pageNumber,
    onChange: (page: number) => setPageNumber(page),
  }

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '공지사항 관리',
      path: RouterPath.Notices.path,
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
    },
  }
}

const mapToNotices = (dto: NoticesDto) => {
  const { items, metaData } = dto

  const notices = items.map(it => ({
    ...it,
    createdAt: it.createdDate.toLocaleString(),
    updateAt: it.updatedDate.toLocaleString(),
  }))

  return {
    notices,
    metaData,
  }
}
