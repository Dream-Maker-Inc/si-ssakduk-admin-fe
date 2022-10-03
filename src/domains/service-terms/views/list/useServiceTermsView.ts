import { DataTableProps } from '@/common/components/DataTable'
import { SearchDialogProps } from '@/common/components/dialogs'
import { CreateActionIconProps } from '@/common/components/icons'
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { useServiceTermsSearchState } from '@/common/recoil/service-terms.atom'
import { RouterPath } from '@/common/router'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { ServiceTermsDto } from '../../data'
import { ServiceTermsApi } from './../../data/service-terms.api'

const PageSize = 10

export const useServiceTermsView = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  const { keyword, withDeleted, handleKeywordChange, handleWithDeletedChange } =
    useServiceTermsSearchState()

  // fetch
  const { data: serviceTermsDto, refetch } = useQuery(
    ['service-terms', pageNumber],
    () =>
      ServiceTermsApi.findAll({
        page: pageNumber,
        size: PageSize,
        keyword,
        withDeleted,
      }),
  )

  const result = { data: null }
  if (!serviceTermsDto) return result
  //

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
      // router.push(RouterPath.Posting.createPathWithId(`${id}`))
    },
  }

  // searchDialog props
  const searchDialogProps: SearchDialogProps = {
    open: searchDialogOpen,
    onClose: () => setSearchDialogOpen(false),
    filterModel: {
      options: {
        checkBoxes: [
          {
            checked: withDeleted,
            onChange: handleWithDeletedChange,
            label: '삭제 포함',
            tooltip: '삭제된 데이터를 포함하여 검색',
          },
        ],
      },
    },
    keywordState: {
      value: keyword,
      onChange: handleKeywordChange,
      onSubmit: () => {
        setSearchDialogOpen(false)
        refetch()
      },
    },
  }

  // create action icon props
  const createActionIconProps: CreateActionIconProps = {
    tooltip: '글 작성',
    iconButtonProps: {
      onClick: () => {
        // router.push(RouterPath.LifePostingCreate.path)
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
