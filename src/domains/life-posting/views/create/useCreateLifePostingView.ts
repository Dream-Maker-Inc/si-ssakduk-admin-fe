import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { UrlRegex } from '@/common/utils/regex'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import {
  LifePostingFormProps,
  useLifePostingForm,
} from '../../components/life-posting-form'
import { CreateLifePostingDto, LifePostingApi } from './../../data'

export const useCreateLifePostingView = () => {
  const router = useRouter()

  const {
    title,
    handleTitleChange,
    content,
    handleContentChange,
    sponsorLink,
    handleSponsorLinkChange,
    attachments,
    handleAttachmentsChange,
    formResult: result,
  } = useLifePostingForm()

  const { mutate } = useMutation(
    (dto: CreateLifePostingDto) => LifePostingApi.create(dto),
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

  const isValidLinkUrl = UrlRegex.test(sponsorLink)
  const isValidFormModel =
    title && content && attachments.length && isValidLinkUrl

  // functions
  const submitForm = () => {
    const { title, content, sponsorLink, attachments } = result
    const dto = new CreateLifePostingDto(
      title,
      content,
      sponsorLink,
      attachments,
    )
    mutate(dto)
  }

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '라이프 관리',
      path: RouterPath.LifePostings.path,
    },
    {
      displayName: '라이프 작성',
      path: RouterPath.LifePostingCreate.path,
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
      placeholder: 'http://example.com',
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
