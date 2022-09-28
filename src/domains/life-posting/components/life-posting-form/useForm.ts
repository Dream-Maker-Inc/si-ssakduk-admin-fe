import { useState } from 'react'

export type FormModel = {
  title: string
  content: string
  sponsorLink: string
  attachments: File[]
}

type Params = {
  defaultModel?: FormModel
}

const initialValue: FormModel = {
  title: '',
  content: '',
  sponsorLink: '',
  attachments: [],
}

const MaxFileCount = 2

export const useLifePostingForm = (params: Params = {}) => {
  const { defaultModel = initialValue } = params

  const [formModel, setformModel] = useState<FormModel>(defaultModel)
  const { title, content, sponsorLink, attachments } = formModel

  const handleTitleChange = (title: string) =>
    setformModel({ ...formModel, title })

  const handleContentChange = (content: string) =>
    setformModel({ ...formModel, content })

  const handleSponsorLinkChange = (sponsorLink: string) =>
    setformModel({ ...formModel, sponsorLink })

  const handleAttachmentsChange = (files: File[]) => {
    if (files.length > MaxFileCount) {
      return alert(`파일은 최대 ${MaxFileCount}개까지 첨부 가능합니다.`)
    }

    const imageRegex = /^image/
    const isFilesValid = files.every(file => imageRegex.test(file.type))

    if (isFilesValid) {
      setformModel({ ...formModel, attachments: Array.from(files) })
    } else {
      alert('이미지 파일만 업로드 가능합니다.')
    }
  }

  return {
    title,
    handleTitleChange,
    content,
    handleContentChange,
    sponsorLink,
    handleSponsorLinkChange,
    attachments,
    handleAttachmentsChange,
    formModel,
  }
}
