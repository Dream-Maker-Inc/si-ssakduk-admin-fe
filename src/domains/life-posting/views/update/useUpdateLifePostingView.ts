import { RouterPath } from '@/common/router'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import {
  FormModel,
  LifePostingFormProps,
  useLifePostingForm,
} from '../../components/life-posting-form'
import { LifePostingApi, LifePostingDto } from '../../data'
import { UpdateLifePostingDto } from '../../data/dto/update-life-posting.dto'

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

  const { data: attachments } = useQuery([lifePostingDto], () =>
    lifePostingDto?.fetchAttachmentFiles(),
  )

  useEffect(() => {
    refetch()
  }, [id, refetch])

  const {
    title,
    handleTitleChange,
    content,
    handleContentChange,
    sponsorLink,
    handleSponsorLinkChange,
    handleAttachmentsChange,
    formModel,
  } = useLifePostingForm({
    defaultModel: {
      title: lifePostingDto?.title ?? '',
      content: lifePostingDto?.content ?? '',
      sponsorLink: lifePostingDto?.link ?? '',
      attachments: [],
    },
  })

  const { mutate } = useMutation(
    ({ title, content, sponsorLink, attachments }: FormModel) =>
      LifePostingApi.update(
        new UpdateLifePostingDto(title, content, sponsorLink, attachments),
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

  // null guard
  const result = { data: null }
  if (!lifePostingDto) return result

  const isValidFormModel = title && content

  // breadcrumbs
  const breadcrumbModels = [
    {
      displayName: '라이프 관리',
      path: RouterPath.LifePostings.path,
    },
    {
      displayName: '라이프 수정',
      path: RouterPath.LifePostingUpdate.createPathWithId(`${id}`),
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
