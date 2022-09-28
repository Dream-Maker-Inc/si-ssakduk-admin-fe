import { RouterPath } from '@/common/router'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import {
  FormModel,
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
    handleAttachmentsChange,
    formModel,
  } = useLifePostingForm()

  const { mutate } = useMutation(
    ({ title, content, sponsorLink, attachments }: FormModel) =>
      LifePostingApi.create(
        new CreateLifePostingDto(title, content, sponsorLink, attachments),
      ),
    {
      onSuccess: res => {
        alert('라이프 등록에 성공 했습니다.')
        router.back()
      },
      onError: (err: AxiosError) => {
        console.error(err)
        alert(`라이프 등록 실패 (${err.code})`)
      },
    },
  )

  const isValidFormModel = title && content

  // breadcrumbs
  const breadcrumbModels = [
    {
      displayName: '라이프 관리',
      path: RouterPath.LifePostings.path,
    },
    {
      displayName: '라이프 작성',
      path: RouterPath.LifePostingCreate.path,
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
    attachmentsInputProps: {
      onChange: (fileList: FileList | null) => {
        const files = fileList && Array.from(fileList)
        if (!files) return

        handleAttachmentsChange(files)
      },
    },
    cancelButtonProps: {
      onClick: () => router.back(),
      children: '취소',
    },
    submitButtonProps: {
      disabled: !isValidFormModel,
      onClick: () => mutate(formModel),
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
