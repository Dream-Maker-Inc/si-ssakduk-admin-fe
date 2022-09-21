import { BlockRounded } from '@mui/icons-material'
import { ButtonProps, IconButton, TextFieldProps, Tooltip } from '@mui/material'
import { useState } from 'react'
import { BlindDialog } from './BlindDialog'

export type BlindDialogActionIconProps = {
  tooltip: string
  type: 'blind' | 'cancel'
  onClick: () => void
  dialogProps: {
    open: boolean
    onClose: () => void
    model: {
      title: string
      primaryText: string
      secondaryText?: string
    }
    cancelButtonProps: ButtonProps
    confirmButtonProps: ButtonProps
    reasonTextFieldProps?: TextFieldProps
  }
}

export const BlindDialogActionIcon = ({
  tooltip,
  type,
  onClick,
  dialogProps,
}: BlindDialogActionIconProps) => {
  const isTypeBlind = type === 'blind'
  const iconColor = isTypeBlind ? 'default' : 'error'

  return (
    <div>
      <Tooltip title={tooltip}>
        <IconButton size={'small'} color={iconColor} onClick={onClick}>
          <BlockRounded />
        </IconButton>
      </Tooltip>

      <BlindDialog isTypeBlind={isTypeBlind} props={dialogProps} />
    </div>
  )
}
