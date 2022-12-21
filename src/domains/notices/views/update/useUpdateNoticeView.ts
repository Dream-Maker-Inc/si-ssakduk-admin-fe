/* eslint-disable react-hooks/exhaustive-deps */
import { BreadcrumbModel } from '@/common/components/TitleContainer'
import { RouterPath } from '@/common/router'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { NoticeFormProps, useNoticeForm } from '../../components'
import { NoticesApi, UpdateNoticeDto } from '../../data'

export const useUpdateNoticeView = (id: number) => {
  const router = useRouter()

  const {
    title,
    handleTitleChange,
    content,
    handleContentChange,
    setFormDefault,
  } = useNoticeForm()

  const isValidForm = title && content

  // fetch old
  const { data: noticeDto, refetch } = useQuery(
    ['notice', id],
    () => NoticesApi.findOne(+id),
    {
      onError: (err: Error) => {
        alert(err.message)
        router.back()
      },
      enabled: false,
      retry: 0,
    },
  )

  const { mutate: submit } = useMutation(
    ({ id, dto }: { id: number; dto: UpdateNoticeDto }) =>
      NoticesApi.update(id, dto),
    {
      onSuccess: () => {
        alert('글 수정에 성공 했습니다.')
        router.back()
      },
      onError: (err: AxiosError) => {
        console.error(err)
        alert(`글 수정 실패 (${err.code})`)
      },
    },
  )

  // effects
  useEffect(() => {
    refetch()
  }, [id, refetch])

  useEffect(() => {
    if (!noticeDto) return

    const { title, content } = noticeDto

    setFormDefault({ title, content })
  }, [noticeDto])

  // null guard
  const result = { data: null }
  if (!noticeDto) return result

  // functions
  const submitForm = () => {
    const dto = new UpdateNoticeDto(title, content)
    submit({ id, dto })
  }

  // breadcrumbs
  const breadcrumbModels: BreadcrumbModel[] = [
    {
      displayName: '공지사항 관리',
      path: RouterPath.Notices.path,
    },
    {
      displayName: '공지사항 수정',
      path: RouterPath.NoticeUpdate.createPathWithId(`${id}`),
      accent: true,
    },
  ]

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
