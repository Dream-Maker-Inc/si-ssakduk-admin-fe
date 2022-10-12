/* eslint-disable react-hooks/exhaustive-deps */
import { DataTableProps } from '@/common/components/DataTable'
import { SearchDialogProps } from '@/common/components/dialogs'
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { PostingDto, PostingsApi, PostingsDto } from '../../data'
import {
  findPostingCategories,
  findPostingCategoriesByValue,
  PostingCategories,
} from '../../models'

const PageSize = 10

export const usePostingsView = () => {
  const router = useRouter()

  const [pageNumber, setPageNumber] = useState(1)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  const {
    queryBuffer,
    query,
    handleKeywordChange,
    handleCategoryChange,
    handleWithBlindChange,
  } = usePostingsQuery()
  const { category, keyword, withBlind } = queryBuffer

  // fetch postings
  const { data: postingsDto } = useQuery(
    ['postings', pageNumber, query],
    () => {
      const { category, keyword, withBlind } = query

      const categoryModel =
        findPostingCategories(category) ?? PostingCategories.All

      return PostingsApi.findAll({
        page: pageNumber,
        size: PageSize,
        keyword,
        category: categoryModel.value,
        withBlind,
      })
    },
    {
      onSuccess: () => setSearchDialogOpen(false),
    },
  )

  // guard
  const result = { data: null }
  if (!postingsDto) return result

  // mapping
  const { postings, metaData } = mapToPostings(postingsDto)
  const categoryModel =
    findPostingCategoriesByValue(category) ?? PostingCategories.All

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
          minWidth: '100px',
          width: '100px',
          typographyProps: {
            children: '카테고리',
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
          minWidth: '100px',
          width: '100px',
          typographyProps: {
            children: '조회수',
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
        postings.map(it => [
          it.id,
          it.category,
          it.title,
          it.content,
          it.viewCount,
          it.stateText,
        ]) ?? [],
    },
    onDataRowClick: (id: number) =>
      router.push(RouterPath.Posting.createPathWithId(`${id}`)),
  }

  // searchDialog props
  const searchDialogProps: SearchDialogProps = {
    open: searchDialogOpen,
    onClose: () => setSearchDialogOpen(false),
    filterModel: {
      selectors: [
        {
          title: '카테고리',
          value: categoryModel.label,
          onChange: handleCategoryChange,
          items: Object.values(PostingCategories).map(it => it.label),
        },
      ],
      options: {
        checkBoxes: [
          {
            checked: withBlind,
            onChange: handleWithBlindChange,
            label: '비공개 포함',
            tooltip: '삭제, 숨김, 정지 등으로 비노출 된 데이터를 포함하여 검색',
          },
        ],
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
  const paginationState = {
    count: metaData.totalPageCount,
    page: pageNumber,
    onChange: (page: number) => setPageNumber(page),
  }

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '게시글 관리',
      path: RouterPath.Postings.path,
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

//
const usePostingsQuery = () => {
  const router = useRouter()

  const [queryBuffer, setQueryBuffer] = useState({
    category: '',
    keyword: '',
    withBlind: false,
  })

  const [query, setQuery] = useState({
    category: '',
    keyword: '',
    withBlind: false,
  })

  const handleCategoryChange = (v: string) => {
    setQueryBuffer({ ...queryBuffer, category: v })
  }
  const handleKeywordChange = (v: string) =>
    setQueryBuffer({ ...queryBuffer, keyword: v })
  const handleWithBlindChange = (checked: boolean) =>
    setQueryBuffer({ ...queryBuffer, withBlind: checked })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const keyword = params.get('keyword') ?? ''
    const category = params.get('category') ?? ''
    const withBlind: boolean = JSON.parse(params.get('withBlind') ?? 'false')

    setQueryBuffer({
      keyword,
      category,
      withBlind,
    })

    setQuery({
      keyword,
      category,
      withBlind,
    })
  }, [router.asPath])

  return {
    queryBuffer,
    query,
    handleKeywordChange,
    handleCategoryChange,
    handleWithBlindChange,
  }
}

//
const mapToPostings = (dto: PostingsDto) => {
  const getStateText = (postingDto: PostingDto) => {
    if (!!postingDto.deletedDate) return '삭제'
    if (postingDto.isBlind) return '블라인드'

    return '공개'
  }

  const { items, metaData } = dto

  const postings = items.map(it => ({
    id: it.id,
    category: it.categoryType?.label,
    title: it.title,
    content: it.content,
    viewCount: it.viewCount,
    stateText: getStateText(it),
  }))

  return {
    postings,
    metaData,
  }
}
