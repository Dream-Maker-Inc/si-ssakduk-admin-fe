import { findCommentFilter } from './../../models/comment.filter'
/* eslint-disable react-hooks/exhaustive-deps */
import { CommentInfoBoxProps } from '@/common/components/CommentInfoBox/CommentInfoBox'
import { SearchDialogProps } from '@/common/components/dialogs'
import { useBlindDialog } from '@/common/components/dialogs/BlindDialog'
import {
  blindDialogDefaultProps,
  BlindDialogProps,
} from '@/common/components/dialogs/BlindDialog/BlindDialog'
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { BlindModel } from '@/data/common'
import { CommentFilters, CommentFiltersType } from '@/domains/comment'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { CommentsApi, CommentsDto } from '../../data'

const PageSize = 5

export const useCommentsView = () => {
  const router = useRouter()

  const [pageNumber, setPageNumber] = useState(1)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  const {
    queryBuffer,
    query,
    handleKeywordChange,
    handleFilterChange,
    handleWithBlindChange,
  } = useCommentsQuery()

  const { filter, withBlind, keyword } = queryBuffer
  const filterModel = findCommentFilter(filter) ?? CommentFilters.Content

  const {
    blindDialogOpen,
    blindReason,
    handleBlindReasonChange,
    openBlindDialog,
    closeBlindDialog,
  } = useBlindDialog()

  const [targetCommentId, setTargetCommentId] = useState(0)

  const { data: commentsDto, refetch } = useQuery(
    ['comments', pageNumber, query],
    () => {
      const { withBlind, filter, keyword } = query

      const getFilterKeyword = (targetFilter: CommentFiltersType) =>
        filter === targetFilter.label ? keyword : ''

      return CommentsApi.findAll({
        page: pageNumber,
        size: PageSize,
        keyword: getFilterKeyword(CommentFilters.Content),
        postingId: getFilterKeyword(CommentFilters.PostingId),
        authorId: getFilterKeyword(CommentFilters.AuthorId),
        withBlind: withBlind,
        withDeleted: withBlind,
      })
    },
  )

  const { mutate: mutateBlindComment } = useMutation(
    ['blind-comment', targetCommentId],
    (blind: BlindModel | null) =>
      CommentsApi.modify(targetCommentId, { blind }),
    {
      onSuccess: () => {
        refetch()
        closeBlindDialog()
        alert('처리 되었습니다.')
      },
      onError: (err: any) => {
        console.error(err)
        alert(err.message)
      },
    },
  )

  // null guard
  const result = { data: null }
  if (!commentsDto) return result

  //
  const { comments, metaData } = mapToComments(commentsDto)
  const comment = comments.find(it => it.id === targetCommentId)

  //
  const commentInfoBoxProps: CommentInfoBoxProps[] = comments.map(it => ({
    model: {
      profileImage: it.author.profileImage,
      author: `${it.author.nickname} (${it.author.name})`,
      content: it.content,
      createdAt: it.createdAt,
      likedCount: it.likedCount,
    },
    blindState: {
      value: it.isBlind,
      onChange: () => {
        setTargetCommentId(it.id)
        openBlindDialog()
      },
      reason: it.blind.reason,
    },
  }))

  // searchDialog props
  const searchDialogProps: SearchDialogProps = {
    open: searchDialogOpen,
    onClose: () => setSearchDialogOpen(false),
    filterModel: {
      selectors: [
        {
          value: filterModel.label,
          onChange: handleFilterChange,
          items: Object.values(CommentFilters).map(it => it.label),
          title: '검색 대상',
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

  // Blind Dialog
  const blindDialogProps: BlindDialogProps = comment
    ? {
        isTypeBlind: !comment.isBlind,
        props: {
          open: blindDialogOpen,
          onClose: closeBlindDialog,
          model: {
            title: comment.isBlind ? '블라인드 해제' : '블라인드',
            primaryText: comment.isBlind
              ? `\
              작성자: ${comment.author.nickname} (${comment.author.name})
              내용: '${_.truncate(comment.content)}'
              `
              : `\
              작성자: ${comment.author.nickname} (${comment.author.name})
              내용: '${_.truncate(comment.content)}'
              `,
            secondaryText: '',
          },
          cancelButtonProps: {
            onClick: closeBlindDialog,
            children: '취소',
          },
          confirmButtonProps: {
            disabled: !comment.isBlind && !blindReason,
            onClick: () => {
              comment.isBlind
                ? mutateBlindComment(null)
                : mutateBlindComment(new BlindModel(blindReason))
            },
            children: comment.isBlind ? '블라인드 해제' : '블라인드',
          },
          reasonTextFieldProps: {
            value: blindReason,
            onChange: e => handleBlindReasonChange(e.target.value),
            placeholder: '블라인드 사유',
          },
        },
      }
    : blindDialogDefaultProps

  // pagination
  const paginationState = {
    count: metaData.totalPageCount,
    page: pageNumber,
    onChange: (page: number) => setPageNumber(page),
  }

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '댓글 관리',
      path: RouterPath.Comments.path,
      accent: true,
    },
  ]

  return {
    data: {
      commentInfoBoxProps,
      openSearchDialog: () => setSearchDialogOpen(true),
      searchDialogProps,
      blindDialogProps,
      breadcrumbModels,
      paginationState,
    },
  }
}

//
const useCommentsQuery = () => {
  const router = useRouter()

  const [queryBuffer, setQueryBuffer] = useState({
    postingId: 0,
    filter: '',
    keyword: '',
    withBlind: false,
  })

  const [query, setQuery] = useState({
    postingId: 0,
    filter: '',
    keyword: '',
    withBlind: false,
  })

  const handleFilterChange = (v: string) => {
    setQueryBuffer({ ...queryBuffer, filter: v })
  }
  const handleKeywordChange = (v: string) =>
    setQueryBuffer({ ...queryBuffer, keyword: v })
  const handleWithBlindChange = (checked: boolean) =>
    setQueryBuffer({ ...queryBuffer, withBlind: checked })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const postingId = params.get('postingId') ?? 0
    const keyword = params.get('keyword') ?? ''
    const filter = params.get('filter') ?? ''
    const withBlind: boolean = JSON.parse(params.get('withBlind') ?? 'false')

    setQueryBuffer({
      postingId: +postingId,
      keyword,
      filter,
      withBlind,
    })

    setQuery({
      postingId: +postingId,
      keyword,
      filter,
      withBlind,
    })
  }, [router.asPath])

  return {
    queryBuffer,
    query,
    handleKeywordChange,
    handleFilterChange,
    handleWithBlindChange,
  }
}

//
const mapToComments = (dto: CommentsDto) => {
  const { items, metaData } = dto

  const comments = items.map(it => ({
    id: it.id,
    content: it.content,
    createdAt: it.createdDate.toLocaleDateString(),
    likedCount: it.likedCount,
    author: {
      nickname: it.author.nickname,
      name: it.author.name,
      profileImage: it.author.profileImage,
    },
    isBlind: it.isBlind,
    blind: {
      reason: it.blind ? `사유: (${it.blind.reason})` : '',
    },
  }))

  return {
    comments,
    metaData,
  }
}
