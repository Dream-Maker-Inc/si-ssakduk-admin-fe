import { useQuery } from 'react-query'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { RouterPath } from '@/common/router'
import { DataTableProps } from '@/common/components/DataTable'
import { SearchDialogProps } from '@/common/components/dialogs'
import { useRecoilState } from 'recoil'
import { postingsSearchAtom } from '@/common/recoil'
import { PostingCategories } from '../../models'
import { PostingDto, PostingsApi, PostingsDto } from '../../data'
import { BreadcrumbModel } from '@/common/components/TitleContainer'

const PageSize = 10

export const usePostingsView = () => {
  const router = useRouter()

  const [pageNumber, setPageNumber] = useState(1)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  const [postingsSearchState, setPostingsSearchState] =
    useRecoilState(postingsSearchAtom)
  const { category, keyword, withBlind } = postingsSearchState
  const handleCategoryChange = (v: string) => {
    const category = Object.values(PostingCategories).find(
      it => it.label === v,
    )!

    setPostingsSearchState({ ...postingsSearchState, category })
  }
  const handleKeywordChange = (v: string) =>
    setPostingsSearchState({ ...postingsSearchState, keyword: v })
  const handleWithBlindChange = (checked: boolean) =>
    setPostingsSearchState({ ...postingsSearchState, withBlind: checked })

  // fetch postings
  const { data: postingsDto, refetch } = useQuery(
    ['postings', pageNumber],
    () =>
      PostingsApi.findAll({
        page: pageNumber,
        size: PageSize,
        keyword,
        category: category.value,
        withBlind,
      }),
    {
      onSuccess: () => setSearchDialogOpen(false),
    },
  )

  const result = { data: null }
  if (!postingsDto) return result
  //

  const { postings, metaData } = mapToPostings(postingsDto)

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
          value: category.label,
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
      onSubmit: () => refetch(),
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
