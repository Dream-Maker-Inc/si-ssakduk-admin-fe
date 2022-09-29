import { useRouter } from 'next/router'
import { BlindDialogActionIconProps } from '@/common/components/dialogs/BlindDialog'
import { RouterPath } from '@/common/router'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { LifePostingDto } from '../../data'
import { LifePostingApi } from './../../data/life-posting.api'
import { AxiosError } from 'axios'
import { BreadcrumbModel } from '@/common/components/TitleContainer'

export const useLifePostingView = (id: number) => {
  const router = useRouter()

  const [blindDialogOpen, setBlindDialogOpen] = useState(false)

  // fetch posting
  const { data: lifePostingDto, refetch } = useQuery(
    ['life-posting', id],
    () => LifePostingApi.findOne(+id),
    {
      onError: (err: Error) => {
        alert(err.message)
        router.back()
      },
      enabled: false,
      retry: 0,
    },
  )

  useEffect(() => {
    refetch()
  }, [id, refetch])

  // delete posting
  const { mutate: deleteLifePosting } = useMutation(
    'delete-life-posting',
    (id: number) => LifePostingApi.delete(id),
    {
      onSuccess: () => {
        alert('삭제 되었습니다.')
        router.push(RouterPath.LifePostings.path)
      },
      onError: (err: AxiosError) => {
        console.error(err)
        alert(`삭제 실패 ${err.code}`)
      },
    },
  )

  // null guard
  const result = { data: null }
  if (!lifePostingDto) return result

  //
  const lifePosting = mapToPosting(lifePostingDto)

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '라이프 관리',
      path: RouterPath.LifePostings.path,
    },
    {
      displayName: '라이프 상세',
      path: RouterPath.LifePosting.createPathWithId(`${id}`),
      accent: true,
    },
  ]

  // Blind Dialog
  const blindDialogActionIconProps: BlindDialogActionIconProps = {
    tooltip: '라이프 삭제',
    type: 'blind',
    onClick: () => setBlindDialogOpen(true),
    dialogProps: {
      open: blindDialogOpen,
      onClose: () => setBlindDialogOpen(false),
      model: {
        title: '라이프 삭제',
        primaryText: '라이프 게시글을 삭제 합니다.',
        secondaryText: '',
      },
      cancelButtonProps: {
        onClick: () => setBlindDialogOpen(false),
        children: '취소',
      },
      confirmButtonProps: {
        onClick: () => deleteLifePosting(id),
        children: '삭제',
      },
    },
  }

  //
  const handleEditClick = () =>
    router.push(RouterPath.LifePostingUpdate.createPathWithId(`${id}`))

  return {
    data: {
      lifePosting,
      breadcrumbModels,
      blindDialogActionIconProps,
      handleEditClick,
    },
  }
}

//
const mapToPosting = (dto: LifePostingDto) => {
  return {
    id: dto.id,
    title: dto.title,
    content: dto.content,
    attachments: dto.attachments,
    viewCount: dto.viewCount,
    createdAt: dto.createdDate.toLocaleString(),
    updatedAt: dto.updatedDate.toLocaleString(),
  }
}
