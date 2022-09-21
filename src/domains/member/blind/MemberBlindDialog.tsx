import { BaseDialog } from '@/common/components/dialogs'
import { Colors } from '@/common/themes/Color'
import { ReportRounded } from '@mui/icons-material'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { css } from '@emotion/react'
import { useMemberBlindDialog } from './useMemberBlindDialog'

export type MemberBlindDialogProps = {
  open: boolean
  onClose: () => void
  memberId: string
  onSuccess?: (res: any) => void
  onFailure?: (error: any) => void
}

export const MemberBlindDialog = ({
  open,
  onClose,
  memberId,
  onSuccess,
  onFailure,
}: MemberBlindDialogProps) => {
  const { data } = useMemberBlindDialog(memberId, onClose, onSuccess, onFailure)
  const {
    noticeText,
    warningText,
    periodState,
    reasonTextFieldProps,
    buttonState,
    handleCancelClick,
  } = data

  return (
    <BaseDialog open={open} onClose={onClose} title={'회원 활동 정지'}>
      <div css={st.inner}>
        <Stack gap={'12px'}>
          <Typography variant='body1'>{noticeText}</Typography>
          <Typography variant='body2' color={Colors.Danger}>
            {warningText}
          </Typography>
        </Stack>

        <div>
          <div css={st.form}>
            <FormControl fullWidth css={st.selectorWrapper}>
              <InputLabel>기간 선택</InputLabel>
              <Select
                value={periodState.value}
                label='기간 선택'
                onChange={e => periodState.onChange(e.target.value)}
              >
                {periodState.items.map(it => (
                  <MenuItem key={it.value} value={it.value}>
                    {it.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField {...reasonTextFieldProps} />
          </div>

          <div css={st.buttonGroup}>
            <Button variant='outlined' onClick={handleCancelClick}>
              취소
            </Button>

            <Button
              disabled={buttonState.disabled}
              variant='contained'
              color={'error'}
              startIcon={<ReportRounded />}
              onClick={buttonState.onClick}
            >
              정지하기
            </Button>
          </div>
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
  form: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
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
