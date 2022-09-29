import { antdUploadFileHelper } from '@/common/components/antd/uploads'
import { UploadFile } from 'antd'
import { useEffect, useState } from 'react'

export type FormModel = {
  title: string
  content: string
  sponsorLink: string
}

export type FormDefault = {
  attachments: UploadFile[]
} & FormModel

export type FormResult = {
  attachments: File[]
} & FormModel

const initialValue: FormModel = {
  title: '',
  content: '',
  sponsorLink: '',
}

const MaxFileCount = 2

export const useLifePostingForm = () => {
  const [formModel, setFormModel] = useState<FormModel>(initialValue)
  const [attachments, setAttachments] = useState<UploadFile[]>([])
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([])

  useEffect(() => {
    antdUploadFileHelper
      .toFiles(attachments)
      .then(files => setAttachmentFiles(files))
  }, [attachments])

  const { title, content, sponsorLink } = formModel

  const handleTitleChange = (title: string) =>
    setFormModel({ ...formModel, title })

  const handleContentChange = (content: string) =>
    setFormModel({ ...formModel, content })

  const handleSponsorLinkChange = (sponsorLink: string) =>
    setFormModel({ ...formModel, sponsorLink })

  const handleAttachmentsChange = (files: UploadFile[]) => {
    if (files.length > MaxFileCount) {
      return alert(`파일은 최대 ${MaxFileCount}개까지 첨부 가능합니다.`)
    }

    const imageRegex = /^image/
    const isFilesValid = files.every(file => imageRegex.test(file.type ?? ''))

    if (isFilesValid) {
      setAttachments(files)
    } else {
      alert('이미지 파일만 업로드 가능합니다.')
    }
  }

  const setFormDefault = (formDefault: FormDefault) => {
    const { title, content, sponsorLink, attachments } = formDefault

    setFormModel({
      title,
      content,
      sponsorLink,
    })

    setAttachments(attachments)
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
    formResult: {
      title,
      content,
      sponsorLink,
      attachments: attachmentFiles,
    },
    setFormDefault,
  }
}
