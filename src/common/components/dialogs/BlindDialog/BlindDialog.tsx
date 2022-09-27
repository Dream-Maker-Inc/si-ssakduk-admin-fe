import { BlindCancelDialogProps, BlindCancelDialog } from './BlindCancelDialog'
import { BlindSubmitDialogProps, BlindSubmitDialog } from './BlindSubmitDialog'

export type BlindDialogProps = {
  isTypeBlind: boolean
  props: BlindSubmitDialogProps | BlindCancelDialogProps
}

export const blindDialogDefaultProps: BlindDialogProps = {
  isTypeBlind: false,
  props: {
    open: false,
    onClose: () => {},
    model: {
      title: '',
      primaryText: '',
      secondaryText: '',
    },
    cancelButtonProps: {},
    confirmButtonProps: {},
    reasonTextFieldProps: {},
  },
}

export const BlindDialog = ({ isTypeBlind, props }: BlindDialogProps) => {
  return isTypeBlind ? (
    <BlindSubmitDialog {...(props as BlindSubmitDialogProps)} />
  ) : (
    <BlindCancelDialog {...(props as BlindCancelDialogProps)} />
  )
}
