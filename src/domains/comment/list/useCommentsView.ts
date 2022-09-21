import {
  CommentFilters,
  CommentFiltersType,
  findCommentFilter,
} from '@/domains/comment'
import { CommentInfoBoxProps } from '@/common/components/CommentInfoBox/CommentInfoBox'
import { SearchDialogProps } from '@/common/components/dialogs'
import { useCommentsSearchState } from '@/common/recoil'
import { RouterPath } from '@/common/router'
import { CommentsApi } from '@/data/comments'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'

const PageSize = 2

export const useCommentsView = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  const {
    filter,
    keyword,
    withBlind,
    handleKeywordChange,
    handleFilterChange,
    handleWithBlindChange,
  } = useCommentsSearchState()

  const getFilterKeyword = (targetFilter: CommentFiltersType) =>
    filter === targetFilter ? keyword : ''

  const { data, refetch } = useQuery(['comments', pageNumber], () =>
    CommentsApi.findAll({
      page: pageNumber,
      size: PageSize,
      keyword: getFilterKeyword(CommentFilters.Content),
      postingId: getFilterKeyword(CommentFilters.PostingId),
      authorId: getFilterKeyword(CommentFilters.AuthorId),
      withBlind,
    }),
  )

  const { mutate: mutateBlindComment } = useMutation(
    'blind-comment',
    (commentId: number) =>
      CommentsApi.blind(commentId, {
        reason: '이용 약관 위반',
      }),
    { onSuccess: () => refetch() },
  )

  const { mutate: mutateCancelBlindComment } = useMutation(
    'blind-comment',
    (commentId: number) => CommentsApi.cancelBlind(commentId),
    { onSuccess: () => refetch() },
  )

  const handleBlindChange = (id: number, isBlind: boolean) => {
    if (isBlind) mutateBlindComment(id)
    else mutateCancelBlindComment(id)
  }

  const result = { data: null }
  if (!data) return result

  const commentInfoBoxProps: CommentInfoBoxProps[] = data.items.map(it => ({
    model: {
      profileImage: it.member.profileImage,
      author: `${it.member.nickname} (${it.member.name})`,
      content: it.comment.content,
      createdAt: it.comment.createdDate.toLocaleString(),
      likedCount: it.likedCount,
    },
    blindState: {
      value: it.comment.isBlind,
      onChange: (b: boolean) => handleBlindChange(it.comment.id, b),
      reason: it.comment.blind?.blindedAtText,
    },
  }))

  // searchDialog props
  const searchDialogProps: SearchDialogProps = {
    open: searchDialogOpen,
    onClose: () => setSearchDialogOpen(false),
    filterModel: {
      selectors: [
        {
          value: filter.label,
          onChange: (v: string) => {
            const filter = findCommentFilter(v) ?? CommentFilters.Content
            handleFilterChange(filter)
          },
          items: Object.values(CommentFilters).map(it => it.label),
          title: '검색 대상',
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
      displayName: '댓글 관리',
      path: RouterPath.Comments.path,
    },
  ]

  return {
    data: {
      commentInfoBoxProps,
      openSearchDialog: () => setSearchDialogOpen(true),
      searchDialogProps,
      breadcrumbModels,
      paginationState,
    },
  }
}
