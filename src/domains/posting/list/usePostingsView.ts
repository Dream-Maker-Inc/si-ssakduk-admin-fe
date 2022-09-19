import { PostingsApi } from '@/data/postings'
import { useQuery } from 'react-query'
import { PostingCategories } from '../models'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { RouterPath } from '@/common/router'
import { DataTableProps } from '@/common/components/DataTable'
import { SearchDialogProps } from '@/common/components/dialogs'
import { useRecoilState } from 'recoil'
import { postingsSearchAtom } from '@/common/recoil'

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
  const { data, refetch } = useQuery(
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

  if (!data) return result

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
        data?.items?.map(it => [
          it.posting.id,
          it.posting.categoryModel.label,
          it.posting.title,
          it.posting.content,
          it.posting.viewCount,
          it.posting.stateText,
        ]) ?? [],
    },
    onDataRowClick: (id: number) =>
      router.push(RouterPath.Posting.createPath(`${id}`)),
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
      checkBoxes: [
        {
          checked: withBlind,
          onChange: handleWithBlindChange,
          label: '비공개 포함',
          tooltip: '삭제, 숨김, 정지 등으로 비노출 된 데이터를 포함하여 검색',
        },
      ],
    },
    keywordState: {
      value: keyword,
      onChange: handleKeywordChange,
      onSubmit: () => refetch(),
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
      displayName: '게시글 관리',
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
    },
  }
}
