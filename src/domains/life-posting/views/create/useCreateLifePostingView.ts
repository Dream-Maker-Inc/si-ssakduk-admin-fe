import { RouterPath } from '@/common/router'
import { ButtonProps, TextFieldProps } from '@mui/material'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { CreateLifePostingDto, LifePostingApi } from './../../data'

type FormModel = {
  title: string
  content: string
  sponsorLink: string
  attachments: File[]
}

export const useCreateLifePostingView = () => {
  const router = useRouter()

  const [formModel, setformModel] = useState<FormModel>({
    title: '',
    content: '',
    sponsorLink: '',
    attachments: [],
  })

  const { title, content, sponsorLink, attachments } = formModel

  const { mutate } = useMutation(
    [formModel],
    () =>
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

  const titleTextFieldProps: TextFieldProps = {
    value: title,
    onChange: e => setformModel({ ...formModel, title: e.target.value }),
    placeholder: '제목을 입력해주세요.',
  }

  const contentTextFieldProps: TextFieldProps = {
    value: content,
    onChange: e => setformModel({ ...formModel, content: e.target.value }),
    placeholder: '내용을 입력해주세요.',
  }

  const sponsorLinkState: TextFieldProps = {
    value: sponsorLink,
    onChange: e => setformModel({ ...formModel, sponsorLink: e.target.value }),
    placeholder: '스폰서 링크를 입력해주세요.',
  }

  const attachmentsInputProps = {
    onChange: (fileList: FileList | null) => {
      const files = fileList && Array.from(fileList)
      if (!files) return
      if (files.length > 2) return alert('파일은 최대 2개까지 첨부 가능합니다.')

      const imageRegex = /^image/
      const isFilesValid = files.every(file => imageRegex.test(file.type))

      if (isFilesValid) {
        setformModel({ ...formModel, attachments: Array.from(fileList) })
      } else {
        alert('이미지 파일만 업로드 가능합니다.')
      }
    },
  }

  const cancelButtonProps: ButtonProps = {
    onClick: () => router.back(),
    children: '취소',
  }
  const submitButtonProps: ButtonProps = {
    disabled: !isValidFormModel,
    onClick: () => mutate(),
    children: '등록',
  }

  return {
    data: {
      breadcrumbModels,
      titleTextFieldProps,
      contentTextFieldProps,
      sponsorLinkState,
      attachmentsInputProps,
      cancelButtonProps,
      submitButtonProps,
    },
  }
}
