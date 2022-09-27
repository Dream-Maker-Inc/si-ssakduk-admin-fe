import { BaseDialog } from '@/common/components/dialogs'
import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { ReportRounded } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { Fragment } from 'react'
import { MemberBlindDialogProps } from './MemberBlindDialog'
import { useMemberBlindCancelDialog } from './useMemberBlindCancelDialog'

export const MemberBlindCancelDialog = ({
  open,
  onClose,
  memberId,
  onSuccess,
  onFailure,
}: MemberBlindDialogProps) => {
  const { data } = useMemberBlindCancelDialog(
    memberId,
    onClose,
    onSuccess,
    onFailure,
  )
  if (!data) return <Fragment />

  const { noticeText, warningText, handleButtonClick, handleCancelClick } = data

  return (
    <BaseDialog open={open} onClose={onClose} title={'회원 활동 정지 해제'}>
      <div css={st.inner}>
        <Stack gap={'12px'}>
          <Typography variant='body1'>{noticeText}</Typography>

          <Typography
            variant='body2'
            color={Colors.Danger}
            sx={{ opacity: 0.8 }}
          >
            {warningText}
          </Typography>
        </Stack>

        <div css={st.buttonGroup}>
          <Button
            variant='outlined'
            color={'inherit'}
            onClick={handleCancelClick}
          >
            취소
          </Button>

          <Button
            variant='contained'
            color={'primary'}
            startIcon={<ReportRounded />}
            onClick={handleButtonClick}
          >
            해제하기
          </Button>
        </div>
      </div>
    </BaseDialog>
  )
}

const st = {
  inner: css`
    display: flex;
    flex-direction: column;
    padding: 16px 16px;
  `,
  selectorWrapper: css`
    margin-top: 40px;
  `,
  buttonGroup: css`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
  `,
}
