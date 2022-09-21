import { Colors } from '@/common/themes/Color'
import { ReportRounded } from '@mui/icons-material'
import { Button, ButtonProps, Stack, Typography } from '@mui/material'
import { BaseDialog } from '../BaseDialog'
import { style } from './style'

export type BlindCancelDialogProps = {
  open: boolean
  onClose: () => void
  model: {
    title: string
    primaryText: string
    secondaryText?: string
  }
  cancelButtonProps: ButtonProps
  confirmButtonProps: ButtonProps
}

export const BlindCancelDialog = ({
  open,
  onClose,
  model,
  cancelButtonProps,
  confirmButtonProps,
}: BlindCancelDialogProps) => {
  const { title, primaryText, secondaryText } = model

  return (
    <BaseDialog open={open} onClose={onClose} title={title}>
      <div css={style.inner}>
        <Stack gap={'12px'}>
          <Typography variant='body1'>{primaryText}</Typography>

          {secondaryText && (
            <Typography
              variant='body2'
              color={Colors.Danger}
              sx={{ opacity: 0.8 }}
            >
              {secondaryText}
            </Typography>
          )}
        </Stack>

        <div css={style.buttonGroup}>
          <Button variant='outlined' color={'inherit'} {...cancelButtonProps} />

          <Button
            variant='contained'
            color={'primary'}
            startIcon={<ReportRounded />}
            {...confirmButtonProps}
          />
        </div>
      </div>
    </BaseDialog>
  )
}
