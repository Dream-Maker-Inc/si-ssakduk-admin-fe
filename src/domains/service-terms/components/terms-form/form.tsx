import { DataRow } from '@/common/components/DataRow'
import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import {
  Button,
  ButtonProps,
  Checkbox,
  CheckboxProps,
  TextField,
  TextFieldProps,
} from '@mui/material'

export type ServiceTermsFormProps = {
  titleTextFieldProps: TextFieldProps
  contentTextFieldProps: TextFieldProps
  requireTermsCheckBoxProps: CheckboxProps
  cancelButtonProps: ButtonProps
  submitButtonProps: ButtonProps
}

export const ServiceTermsForm = (p: ServiceTermsFormProps) => {
  const {
    titleTextFieldProps,
    contentTextFieldProps,
    requireTermsCheckBoxProps,
    cancelButtonProps,
    submitButtonProps,
  } = p

  return (
    <div css={st.root}>
      <div css={st.inner}>
        <DataRow
          title='제목'
          content={<TextField fullWidth {...titleTextFieldProps} />}
        />
        <DataRow
          title='내용'
          content={
            <TextField
              fullWidth
              multiline
              rows={10}
              {...contentTextFieldProps}
            />
          }
        />
        <DataRow
          title='필수 여부'
          content={<Checkbox {...requireTermsCheckBoxProps} />}
        />
      </div>

      <div css={st.buttonsContainer}>
        <div css={st.cancelButtonWrapper}>
          <Button
            variant={'outlined'}
            color={'inherit'}
            {...cancelButtonProps}
          />
        </div>

        <Button variant={'contained'} {...submitButtonProps} />
      </div>
    </div>
  )
}

const st = {
  root: css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  inner: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    color: ${Colors.TextPrimary};
  `,
  buttonsContainer: css`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  `,
  cancelButtonWrapper: css`
    color: ${Colors.WeakItem};
  `,
}
