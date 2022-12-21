import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { NoticeFormProps, useNoticeForm } from '../../components'
import { CreateNoticeDto, NoticesApi } from '../../data'

export const useCreateNoticeView = () => {
  const router = useRouter()

  const { title, handleTitleChange, content, handleContentChange } =
    useNoticeForm()

  const isValidForm = title && content

  const { mutate: submit } = useMutation(
    (dto: CreateNoticeDto) => NoticesApi.create(dto),
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

  const submitForm = () => {
    const dto = new CreateNoticeDto(title, content)
    submit(dto)
  }

  // form props
  const formProps: NoticeFormProps = {
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
    cancelButtonProps: {
      onClick: () => router.back(),
      children: '취소',
    },
    submitButtonProps: {
      disabled: !isValidForm,
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

// breadcrumbs
const breadcrumbModels: BreadcrumbModel[] = [
  {
    displayName: '공지사항 관리',
    path: RouterPath.Notices.path,
  },
  {
    displayName: '공지사항 작성',
    path: RouterPath.NoticeCreate.path,
    accent: true,
  },
]
