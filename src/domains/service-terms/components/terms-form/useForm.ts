import { useState } from 'react'

export type FormModel = {
  title: string
  content: string
  isRequired: boolean
}

export const useServiceTermsForm = () => {
  const [formModel, setFormModel] = useState<FormModel>({
    title: '',
    content: '',
    isRequired: false,
  })

  const { title, content, isRequired } = formModel

  const handleTitleChange = (title: string) =>
    setFormModel({ ...formModel, title })

  const handleContentChange = (content: string) =>
    setFormModel({ ...formModel, content })

  const handleIsRequiredChange = (isRequired: boolean) =>
    setFormModel({ ...formModel, isRequired })

  const setFormDefault = (formDefault: FormModel) => setFormModel(formDefault)

  return {
    title,
    handleTitleChange,
    content,
    handleContentChange,
    isRequired,
    handleIsRequiredChange,
    formResult: formModel,
    setFormDefault,
  }
}
