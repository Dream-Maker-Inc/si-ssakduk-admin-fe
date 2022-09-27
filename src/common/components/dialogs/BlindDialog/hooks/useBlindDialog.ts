import { useState } from 'react'

export const useBlindDialog = () => {
  const [blindDialogModel, setBlindDialogModel] = useState({
    blindDialogOpen: false,
    blindReason: '',
  })

  const { blindDialogOpen, blindReason } = blindDialogModel

  const openBlindDialog = () =>
    setBlindDialogModel(old => ({ ...old, blindDialogOpen: true }))

  const closeBlindDialog = () =>
    setBlindDialogModel(old => ({ ...old, blindDialogOpen: false }))

  const handleBlindReasonChange = (reason: string) =>
    setBlindDialogModel(old => ({ ...old, blindReason: reason }))

  return {
    blindDialogOpen,
    blindReason,
    handleBlindReasonChange,
    openBlindDialog,
    closeBlindDialog,
  }
}
