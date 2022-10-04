import { BlindDialogActionIconProps } from '@/common/components/dialogs/BlindDialog'
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { BlindModel } from '@/data/common'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { PostingDto, PostingsApi } from '../../data'

export const usePostingView = (id: string) => {
  const [blindDialogOpen, setBlindDialogOpen] = useState(false)
  const [blindReason, setBlindReason] = useState('')

  // fetch posting
  const { data: postingDto, refetch } = useQuery(['posting', id], () =>
    PostingsApi.findOne(id),
  )

  // blind posting
  const { mutate: mutatePostingBlind } = useMutation(
    'blind-posting',
    (blind: BlindModel | null) => PostingsApi.modify(id, { blind }),
    {
      onSuccess: () => {
        refetch()
        setBlindDialogOpen(false)
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
  if (!postingDto) return result

  //
  const posting = mapToPosting(postingDto)

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '게시글 관리',
      path: RouterPath.Postings.path,
    },
    {
      displayName: '게시글 상세',
      path: RouterPath.Posting.createPathWithId(id),
      accent: true,
    },
  ]

  // Blind Dialog
  const blindDialogActionIconProps: BlindDialogActionIconProps = {
    tooltip: posting.isBlind ? '블라인드 해제' : '블라인드',
    type: posting.isBlind ? 'cancel' : 'blind',
    onClick: () => setBlindDialogOpen(true),
    dialogProps: {
      open: blindDialogOpen,
      onClose: () => setBlindDialogOpen(false),
      model: {
        title: posting.isBlind ? '게시글 블라인드 해제' : '게시글 블라인드',
        primaryText: posting.isBlind
          ? `'${posting.title}' 게시글을 블라인드 해제 합니다.`
          : `'${posting.title}' 게시글을 블라인드 합니다.`,
        secondaryText: '',
      },
      cancelButtonProps: {
        onClick: () => setBlindDialogOpen(false),
        children: '취소',
      },
      confirmButtonProps: {
        disabled: !posting.isBlind && !blindReason,
        onClick: () => {
          posting.isBlind
            ? mutatePostingBlind(null)
            : mutatePostingBlind(new BlindModel(blindReason))
        },
        children: posting.isBlind ? '블라인드 해제' : '블라인드',
      },
      reasonTextFieldProps: {
        value: blindReason,
        onChange: e => setBlindReason(e.target.value),
        placeholder: '블라인드 사유',
      },
    },
  }

  return {
    data: {
      posting,
      breadcrumbModels,
      blindDialogActionIconProps,
    },
  }
}

//
const mapToPosting = (dto: PostingDto) => {
  const { blind } = dto

  return {
    id: dto.id,
    title: dto.title,
    content: dto.content,
    category: dto.categoryType?.label,
    attachments: dto.attachments,
    viewCount: dto.viewCount,
    likedCount: dto.likedCount,
    commentCount: dto.commentCount,
    createdAt: dto.createdDate.toLocaleString(),
    updatedAt: dto.updatedDate.toLocaleString(),
    author: {
      id: dto.author.id,
      name: dto.author.nickname,
    },
    isBlind: dto.isBlind,
    blind: {
      reason: blind
        ? `기간: ~ ${blind.endedDate ?? '무기한'}
        사유: (${blind.reason})`
        : '',
    },
  }
}
