import { useState } from 'react'

export type FormModel = {
  title: string
  content: string
}

export const useNoticeForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleTitleChange = (title: string) => setTitle(title)
  const handleContentChange = (content: string) => setContent(content)

  const setFormDefault = (fm: FormModel) => {
    setTitle(fm.title)
    setContent(fm.content)
  }

  return {
    title,
    handleTitleChange,
    content,
    handleContentChange,
    setFormDefault,
  }
}
