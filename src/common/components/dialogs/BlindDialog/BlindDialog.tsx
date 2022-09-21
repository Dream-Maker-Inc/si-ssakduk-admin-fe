import { BlindCancelDialogProps, BlindCancelDialog } from './BlindCancelDialog'
import { BlindSubmitDialogProps, BlindSubmitDialog } from './BlindSubmitDialog'

export type BlindDialogProps = {
  isTypeBlind: boolean
  props: BlindSubmitDialogProps | BlindCancelDialogProps
}

export const BlindDialog = ({ isTypeBlind, props }: BlindDialogProps) => {
  return isTypeBlind ? (
    <BlindSubmitDialog {...(props as BlindSubmitDialogProps)} />
  ) : (
    <BlindCancelDialog {...(props as BlindCancelDialogProps)} />
  )
}
