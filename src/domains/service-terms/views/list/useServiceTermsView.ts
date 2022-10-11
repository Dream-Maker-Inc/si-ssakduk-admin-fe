/* eslint-disable react-hooks/exhaustive-deps */
import { DataTableProps } from '@/common/components/DataTable'
import { SearchDialogProps } from '@/common/components/dialogs'
import { CreateActionIconProps } from '@/common/components/icons'
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ServiceTermsDto } from '../../data'
import { ServiceTermsApi } from './../../data/service-terms.api'

const PageSize = 10

export const useServiceTermsView = () => {
  const router = useRouter()

  const [pageNumber, setPageNumber] = useState(1)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [keywordBuffer, setKeywordBuffer] = useState('')
  const [keyword, setKeyword] = useState('')

  // fetch
  const { data: serviceTermsDto } = useQuery(
    ['service-terms', pageNumber, keyword],
    () =>
      ServiceTermsApi.findAll({
        page: pageNumber,
        size: PageSize,
        keyword,
        withDeleted: false,
      }),
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
  if (!serviceTermsDto) return result

  // mapping
  const { serviceTerms, metaData } = mapToTerms(serviceTermsDto)

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
          typographyProps: {
            children: '제목',
          },
        },
        {
          minWidth: '240px',
          width: '240px',
          typographyProps: {
            children: '생성일',
          },
        },
        {
          minWidth: '120px',
          width: '120px',
          typographyProps: {
            children: '필수 여부',
          },
        },
        {
          minWidth: '100px',
          width: '100px',
          typographyProps: {
            children: '상태',
          },
        },
      ],
      data:
        serviceTerms.map(it => [
          it.id,
          it.title,
          it.createdAt,
          it.isRequiredText,
          it.stateText,
        ]) ?? [],
    },
    onDataRowClick: (id: number) => {
      router.push(RouterPath.ServiceTerm.createPathWithId(`${id}`))
    },
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
      onClick: () => {
        router.push(RouterPath.ServiceTermCreate.path)
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
      displayName: '이용약관 관리',
      path: RouterPath.ServiceTerm.path,
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
const mapToTerms = (dto: ServiceTermsDto) => {
  const { items, metaData } = dto

  const serviceTerms = items.map(it => ({
    id: it.id,
    title: it.title,
    content: it.content,
    createdAt: it.createdDate.toLocaleString(),
    isRequiredText: it.isRequired ? '필수' : '선택',
    stateText: it.deletedDate ? '삭제' : '공개',
  }))

  return {
    serviceTerms,
    metaData,
  }
}
