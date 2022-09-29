/* eslint-disable react-hooks/exhaustive-deps */
import { antdUploadFileHelper } from '@/common/components/antd/uploads'
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import {
  LifePostingFormProps,
  useLifePostingForm,
} from '../../components/life-posting-form'
import { LifePostingApi, UpdateLifePostingDto } from '../../data'

export const useUpdateLifePostingView = (id: number) => {
  const router = useRouter()

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

  const {
    title,
    handleTitleChange,
    content,
    handleContentChange,
    sponsorLink,
    handleSponsorLinkChange,
    attachments,
    handleAttachmentsChange,
    formResult: formResult,
    setFormDefault,
  } = useLifePostingForm()

  const isValidFormModel = title && content

  const { mutate } = useMutation(
    ({ id, dto }: { id: number; dto: UpdateLifePostingDto }) =>
      LifePostingApi.update(id, dto),
    {
      onSuccess: () => {
        alert('라이프 등록에 성공 했습니다.')
        router.back()
      },
      onError: (err: AxiosError) => {
        console.error(err)
        alert(`라이프 등록 실패 (${err.code})`)
      },
    },
  )

  // effects
  useEffect(() => {
    refetch()
  }, [id, refetch])

  useEffect(() => {
    if (!lifePostingDto) return

    const { title, content, link, attachments: resourceUrls } = lifePostingDto
    const attachments = antdUploadFileHelper.fromUrls(resourceUrls, 'image/png')

    setFormDefault({
      title,
      content,
      sponsorLink: link,
      attachments,
    })
  }, [lifePostingDto])

  // null guard
  const result = { data: null }
  if (!lifePostingDto) return result

  // functions
  const submitForm = () => {
    const { title, content, sponsorLink, attachments } = formResult
    const dto = new UpdateLifePostingDto(
      title,
      content,
      sponsorLink,
      attachments,
    )

    mutate({ id, dto })
  }

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '라이프 관리',
      path: RouterPath.LifePostings.path,
    },
    {
      displayName: '라이프 수정',
      path: RouterPath.LifePostingUpdate.createPathWithId(`${id}`),
      accent: true,
    },
  ]

  const formProps: LifePostingFormProps = {
    titleTextFieldProps: {
      value: title,
      onChange: e => handleTitleChange(e.target.value),
      placeholder: '제목을 입력해주세요.',
    },
    contentTextFieldProps: {
      value: content,
      onChange: e => handleContentChange(e.target.value),
      placeholder: '내용을 입력해주세요.',
    },
    sponsorLinkProps: {
      value: sponsorLink,
      onChange: e => handleSponsorLinkChange(e.target.value),
      placeholder: '스폰서 링크를 입력해주세요.',
    },
    attachmentsProps: {
      files: attachments,
      onChange: handleAttachmentsChange,
      maxSize: 2,
    },
    cancelButtonProps: {
      onClick: () => router.back(),
      children: '취소',
    },
    submitButtonProps: {
      disabled: !isValidFormModel,
      onClick: submitForm,
      children: '등록',
    },
  }

  return {
    data: {
      breadcrumbModels,
      formProps,
    },
  }
}
