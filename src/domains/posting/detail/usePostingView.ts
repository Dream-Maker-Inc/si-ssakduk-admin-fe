import { BlindDialogActionIconProps } from '@/common/components/dialogs/BlindDialog'
import { RouterPath } from '@/common/router'
import { BlindModel } from '@/data/common'
import { PostingsApi } from '@/data/postings'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'

export const usePostingView = (id: string) => {
  const [blindDialogOpen, setBlindDialogOpen] = useState(false)
  const [blindReason, setBlindReason] = useState('')

  // fetch posting
  const { data: postingDetail, refetch } = useQuery(['posting', id], () =>
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
      },
      onError: (err: any) => {
        console.error(err)
        alert(err.message)
      },
    },
  )

  // null guard
  const result = { data: null }
  if (!postingDetail) return result

  const { posting } = postingDetail

  // flow

  // breadcrumbs
  const breadcrumbModels = [
    {
      displayName: '게시글 관리',
      path: RouterPath.Postings.path,
    },
    {
      displayName: '게시글 상세',
      path: RouterPath.Posting.createPath(id),
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
        secondaryText: posting.blind?.blindedAtText || '',
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
      postingDetail,
      breadcrumbModels,
      blindDialogActionIconProps,
    },
  }
}
