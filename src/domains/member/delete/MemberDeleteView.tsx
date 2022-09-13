import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { ReportRounded } from '@mui/icons-material'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { useMemberDeleteView } from './useMemberDeleteView'

type MemberDeleteViewProps = {
  id: string
}

export const MemberDeleteView = ({ id }: MemberDeleteViewProps) => {
  const { data } = useMemberDeleteView(id)
  const {
    periodState,
    buttonState,
    handleCancelClick,
    breadcrumbModels,
    member,
  } = data

  return (
    <Stack gap={'16px'}>
      <section css={st.headerSection}>
        <TitleContainer
          title={'회원 활동 정지'}
          breadcrumbModels={breadcrumbModels}
        />

        <Typography variant='body2' color={Colors.TextSecondary}>
          탈퇴 회원 정보는 탈퇴 회원 관리에서 조회가 가능합니다.
        </Typography>
      </section>

      <ContentContainer>
        <div>
          <Typography variant='body1'>
            {`${member.name}(${member.nickname}) 님의 활동을 다음 기간 동안 제한합니다.`}
          </Typography>

          <Typography variant='body1' color={Colors.Danger}>
            ※ 본 작업은 실행 후 취소할 수 없으므로 신중히 진행하시기 바랍니다.
          </Typography>
        </div>

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

        <div css={st.buttonGroup}>
          <Button variant='outlined' onClick={handleCancelClick}>
            취소
          </Button>

          <Button
            disabled={buttonState.disabled}
            variant='outlined'
            color={'error'}
            startIcon={<ReportRounded />}
            onClick={buttonState.onClick}
          >
            정지하기
          </Button>
        </div>
      </ContentContainer>
    </Stack>
  )
}

const st = {
  headerSection: css`
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
