import { ServiceTermDto } from '../../data/dto/service-term.dto'
import { RouterPath } from '@/common/router'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { ServiceTermsApi } from '../../data'
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { BlindDialogActionIconProps } from '@/common/components/dialogs/BlindDialog'

export const useServiceTermView = (id: number) => {
  const router = useRouter()

  const [blindDialogOpen, setBlindDialogOpen] = useState(false)

  // fetch posting
  const { data: serviceTermDto } = useQuery(
    ['service-term', id],
    () => ServiceTermsApi.findOne(+id),
    {
      onError: (err: Error) => {
        alert(err.message)
        router.back()
      },
    },
  )

  // delete posting
  const { mutate: deleteTerm } = useMutation(
    'delete-life-posting',
    (id: number) => ServiceTermsApi.remove(id),
    {
      onSuccess: () => {
        alert('삭제 되었습니다.')
        router.push(RouterPath.ServiceTerms.path)
      },
      onError: (err: AxiosError) => {
        console.error(err)
        alert(`삭제 실패 ${err.code}`)
      },
    },
  )

  // null guard
  const result = { data: null }
  if (!serviceTermDto) return result

  //
  const term = mapToTerm(serviceTermDto)

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '이용약관 관리',
      path: RouterPath.ServiceTerms.path,
    },
    {
      displayName: '이용약관 상세',
      path: RouterPath.ServiceTerm.createPathWithId(`${id}`),
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
        title: '이용약관 삭제',
        primaryText: '이용약관을 삭제 합니다.',
        secondaryText:
          '사용자의 서비스 이용에 영향을 끼치는 작업이므로 신중히 진행해주세요.',
      },
      cancelButtonProps: {
        onClick: () => setBlindDialogOpen(false),
        children: '취소',
      },
      confirmButtonProps: {
        onClick: () => deleteTerm(id),
        children: '삭제',
      },
    },
  }

  //
  const handleEditClick = () =>
    router.push(RouterPath.ServiceTermUpdate.createPathWithId(`${id}`))

  return {
    data: {
      term,
      breadcrumbModels,
      blindDialogActionIconProps,
      handleEditClick,
    },
  }
}

//
const mapToTerm = (dto: ServiceTermDto) => {
  return {
    id: dto.id,
    title: dto.title,
    content: dto.content,
    createdAt: dto.createdDate.toLocaleString(),
    updatedAt: dto.updatedDate.toLocaleString(),
    isRequiredText: dto.isRequired ? '필수' : '선택',
    stateText: dto.deletedDate ? '삭제' : '공개',
  }
}
