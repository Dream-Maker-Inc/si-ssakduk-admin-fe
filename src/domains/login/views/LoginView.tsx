import styled from '@emotion/styled'
import { LockRounded, MailOutlineRounded } from '@mui/icons-material'
import {
  Button,
  Card,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useLoginView } from './useLoginView'

export const LoginView = () => {
  const { idState, pwState, signInState } = useLoginView()

  return (
    <Stack component={'section'} flex={1} alignItems={'center'} mt={'140px'}>
      <InnerCard elevation={3}>
        <Stack alignItems={'center'}>
          <Typography variant='h4' fontWeight={500}>
            {'싹둑 관리자'}
          </Typography>

          <Typography variant='h6' fontWeight={'normal'} sx={{ opacity: 0.6 }}>
            {'로그인 후 이용해주세요.'}
          </Typography>
        </Stack>

        <Stack width={'100%'} spacing={2}>
          <TextField
            fullWidth
            label={'이메일 입력'}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <MailOutlineRounded />
                </InputAdornment>
              ),
            }}
            value={idState.value}
            onChange={e => idState.onChange(e.target.value)}
          />
          <TextField
            fullWidth
            type={'password'}
            label={'비밀번호 입력'}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <LockRounded />
                </InputAdornment>
              ),
            }}
            value={pwState.value}
            onChange={e => pwState.onChange(e.target.value)}
          />
        </Stack>

        <Button
          fullWidth
          variant='contained'
          size='large'
          disabled={signInState.disabled}
          onClick={signInState.onClick}
        >
          로그인
        </Button>
      </InnerCard>
    </Stack>
  )
}

const InnerCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 400px;
  height: 100%;

  padding: 48px 36px;
  gap: 48px;
`
