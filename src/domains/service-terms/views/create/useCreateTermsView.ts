import { ServiceTermsApi } from './../../data/service-terms.api'
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import {
  ServiceTermsFormProps,
  useServiceTermsForm,
} from '../../components/terms-form'
import { CreateServiceTermDto } from '../../data'
import { AxiosError } from 'axios'

export const useCreateTermsView = () => {
  const router = useRouter()

  const {
    title,
    handleTitleChange,
    content,
    handleContentChange,
    isRequired,
    handleIsRequiredChange,
    formResult,
  } = useServiceTermsForm()

  const { mutate } = useMutation(
    (dto: CreateServiceTermDto) => ServiceTermsApi.create(dto),
    {
      onSuccess: () => {
        alert('글 등록에 성공 했습니다.')
        router.back()
      },
      onError: (err: AxiosError) => {
        console.error(err)
        alert(`글 등록 실패 (${err.code})`)
      },
    },
  )

  const isValidFormModel = title && content

  // functions
  const submitForm = () => {
    const { title, content, isRequired } = formResult
    const dto = new CreateServiceTermDto(title, content, isRequired)
    mutate(dto)
  }

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '이용약관 관리',
      path: RouterPath.ServiceTerms.path,
    },
    {
      displayName: '이용약관 작성',
      path: RouterPath.ServiceTermCreate.path,
      accent: true,
    },
  ]

  // formProps
  const formProps: ServiceTermsFormProps = {
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
    requireTermsCheckBoxProps: {
      checked: isRequired,
      onChange: (_, checked) => handleIsRequiredChange(checked),
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
