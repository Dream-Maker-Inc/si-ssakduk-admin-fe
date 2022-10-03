/* eslint-disable react-hooks/exhaustive-deps */
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import {
  ServiceTermsFormProps,
  useServiceTermsForm,
} from '../../components/terms-form'
import { ServiceTermsApi, UpdateServiceTermDto } from '../../data'

export const useUpdateTermsView = (id: number) => {
  const router = useRouter()

  const {
    title,
    handleTitleChange,
    content,
    handleContentChange,
    isRequired,
    handleIsRequiredChange,
    formResult,
    setFormDefault,
  } = useServiceTermsForm()

  // fetch posting
  const { data: serviceTermDto, refetch } = useQuery(
    ['service-term', id],
    () => ServiceTermsApi.findOne(+id),
    {
      onError: (err: Error) => {
        alert(err.message)
        router.back()
      },
      enabled: false,
      retry: 0,
    },
  )

  const { mutate } = useMutation(
    ({ id, dto }: { id: number; dto: UpdateServiceTermDto }) =>
      ServiceTermsApi.update(id, dto),
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

  // effects
  useEffect(() => {
    refetch()
  }, [id, refetch])

  useEffect(() => {
    if (!serviceTermDto) return

    const { title, content, isRequired } = serviceTermDto

    setFormDefault({
      title,
      content,
      isRequired,
    })
  }, [serviceTermDto])

  // null guard
  const result = { data: null }
  if (!serviceTermDto) return result

  // functions
  const submitForm = () => {
    const { title, content, isRequired } = formResult
    const dto = new UpdateServiceTermDto(title, content, isRequired)
    mutate({ id, dto })
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
