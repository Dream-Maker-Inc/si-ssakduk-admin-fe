import { DataRow } from '@/common/components/DataRow'
import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { Button, ButtonProps, TextField, TextFieldProps } from '@mui/material'

export type NoticeFormProps = {
  titleTextFieldProps: TextFieldProps
  contentTextFieldProps: TextFieldProps
  cancelButtonProps: ButtonProps
  submitButtonProps: ButtonProps
}

export const NoticeForm = (p: NoticeFormProps) => {
  const {
    titleTextFieldProps,
    contentTextFieldProps,
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
    padding: 12px;
  `,
  cancelButtonWrapper: css`
    color: ${Colors.WeakItem};
  `,
}
