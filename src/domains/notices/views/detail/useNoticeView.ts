import { BlindDialogActionIconProps } from '@/common/components/dialogs/BlindDialog'
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { NoticeDto, NoticesApi } from '../../data'

export const useNoticeView = (id: number) => {
  const router = useRouter()

  const [blindDialogOpen, setBlindDialogOpen] = useState(false)

  // fetch
  const { data: noticeDto } = useQuery(
    ['notice', id],
    () => NoticesApi.findOne(+id),
    {
      onError: (err: Error) => {
        alert(err.message)
        router.back()
      },
    },
  )

  // delete
  const { mutate: deleteNotice } = useMutation(
    'delete-life-posting',
    (id: number) => NoticesApi.remove(id),
    {
      onSuccess: () => {
        alert('삭제 되었습니다.')
        router.push(RouterPath.Notices.path)
      },
      onError: (err: AxiosError) => {
        console.error(err)
        alert(`삭제 실패 ${err.code}`)
      },
    },
  )

  // null guard
  const result = { data: null }
  if (!noticeDto) return result

  const notice = mapToNotice(noticeDto)

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '공지사항 관리',
      path: RouterPath.Notices.path,
    },
    {
      displayName: '공지사항 상세',
      path: RouterPath.Notice.createPathWithId(`${id}`),
      accent: true,
    },
  ]

  // Blind Dialog
  const blindDialogActionIconProps: BlindDialogActionIconProps = {
    tooltip: '삭제',
    type: 'blind',
    onClick: () => setBlindDialogOpen(true),
    dialogProps: {
      open: blindDialogOpen,
      onClose: () => setBlindDialogOpen(false),
      model: {
        title: '공지사항 삭제',
        primaryText: '공지사항을 삭제 합니다.',
        secondaryText:
          '사용자의 서비스 이용에 영향을 끼치는 작업이므로 신중히 진행해주세요.',
      },
      cancelButtonProps: {
        onClick: () => setBlindDialogOpen(false),
        children: '취소',
      },
      confirmButtonProps: {
        onClick: () => deleteNotice(id),
        children: '삭제',
      },
    },
  }

  //
  const handleEditClick = () =>
    router.push(RouterPath.NoticeUpdate.createPathWithId(`${id}`))

  return {
    data: {
      notice,
      breadcrumbModels,
      blindDialogActionIconProps,
      handleEditClick,
    },
  }
}

//
const mapToNotice = (dto: NoticeDto) => {
  return {
    id: dto.id,
    title: dto.title,
    content: dto.content,
    createdAt: dto.createdDate.toLocaleString(),
    updatedAt: dto.updatedDate.toLocaleString(),
  }
}
