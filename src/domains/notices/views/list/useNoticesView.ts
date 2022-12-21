import { DataTableProps } from '@/common/components/DataTable'
import { SearchDialogProps } from '@/common/components/dialogs'
import { CreateActionIconProps } from '@/common/components/icons'
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { NoticeDto, NoticesApi } from '../../data'

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

  // init url params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const keyword = params.get('keyword') ?? ''
    setKeywordBuffer(keyword)
    setKeyword(keyword)
  }, [router.asPath])

  // guard
  const result = { data: null }
  if (!noticesDto) return result

  const { items, metaData } = noticesDto

  // table
  const dataTableProps: DataTableProps = mapToTableProps(items, id =>
    router.push(RouterPath.Notice.createPathWithId(`${id}`)),
  )

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
      onClick: () => {
        router.push(RouterPath.NoticeCreate.path)
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
      createActionIconProps,
    },
  }
}

// 서버 데이터 => 테이블 모델
const mapToTableProps = (
  notices: NoticeDto[],
  onDataRowClick: (id: number) => void,
) => {
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
          minWidth: '200px',
          width: '200px',
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
          minWidth: '200px',
          width: '200px',
          typographyProps: {
            children: '생성일',
          },
        },
        {
          minWidth: '200px',
          width: '200px',
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
          it.createdDate.toLocaleString(),
          it.updatedDate.toLocaleString(),
        ]) ?? [],
    },
    onDataRowClick,
  }

  return dataTableProps
}
