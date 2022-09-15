import { PostingsApi } from '@/data/postings'
import { useQuery } from 'react-query'
import { PostingCategory } from '../models'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { RouterPath } from '@/common/router'
import { DataTableProps } from '@/common/components/DataTable'

const PageSize = 10

export const usePostingsView = () => {
  const router = useRouter()

  const [pageNumber, setPageNumber] = useState(1)
  const [searchWord, setSearchWord] = useState('')
  const [keyword, setKeyword] = useState('')

  // fetch postings
  const { data } = useQuery(['postings', pageNumber, searchWord], () =>
    PostingsApi.findAll({
      page: pageNumber,
      size: PageSize,
      keyword: searchWord,
      category: PostingCategory.CorporateViolence,
    }),
  )

  const result = { data: null }

  if (!data) return result

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
            children: '좋아요 수',
          },
        },
        {
          minWidth: '100px',
          width: '100px',
          typographyProps: {
            children: '조회수',
          },
        },
      ],
      data:
        data?.items?.map(it => [
          it.posting.id,
          it.posting.title,
          it.posting.content,
          it.likedCount,
          it.posting.viewCount,
        ]) ?? [],
    },
    onDataRowClick: (id: number) =>
      router.push(RouterPath.Posting.createPath(`${id}`)),
  }

  // searchBar
  const handleKeywordChange = (v: string) => setKeyword(v)
  const handleKeywordSubmit = () => setSearchWord(keyword)

  // pagination
  const count = data?.metaData?.totalPageCount
  const handleChangePageNumber = (page: number) => setPageNumber(page)

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
      keywordState: {
        value: keyword,
        onChange: handleKeywordChange,
        onSubmit: handleKeywordSubmit,
      },
      paginationState: {
        count,
        page: pageNumber,
        onChange: handleChangePageNumber,
      },
      breadcrumbModels,
    },
  }
}
