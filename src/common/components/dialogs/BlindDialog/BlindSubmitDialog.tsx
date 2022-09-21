import { Colors } from '@/common/themes/Color'
import { ReportRounded } from '@mui/icons-material'
import {
  Button,
  ButtonProps,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material'
import { BaseDialog } from '../BaseDialog'
import { style } from './style'

export type BlindSubmitDialogProps = {
  open: boolean
  onClose: () => void
  model: {
    title: string
    primaryText: string
    secondaryText?: string
  }
  reasonTextFieldProps: TextFieldProps
  cancelButtonProps: ButtonProps
  confirmButtonProps: ButtonProps
}

export const BlindSubmitDialog = ({
  open,
  onClose,
  model,
  reasonTextFieldProps,
  cancelButtonProps,
  confirmButtonProps,
}: BlindSubmitDialogProps) => {
  const { title, primaryText, secondaryText } = model

  return (
    <BaseDialog open={open} onClose={onClose} title={title}>
      <div css={style.inner}>
        <Stack gap={'12px'}>
          <Typography variant='body1'>{primaryText}</Typography>

          {secondaryText && (
            <Typography variant='body2' color={Colors.Danger}>
              {secondaryText}
            </Typography>
          )}
        </Stack>

        <div>
          <div css={style.form}>
            <TextField {...reasonTextFieldProps} />
          </div>

          <div css={style.buttonGroup}>
            <Button variant='outlined' {...cancelButtonProps} />

            <Button
              variant='contained'
              color={'error'}
              startIcon={<ReportRounded />}
              {...confirmButtonProps}
            />
          </div>
        </div>
      </div>
    </BaseDialog>
  )
}
