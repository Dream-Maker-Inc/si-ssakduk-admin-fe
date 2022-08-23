import { css } from '@emotion/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import SendRounded from '@mui/icons-material/SendRounded'

import { member } from '@/data/member'
import { Colors } from '@/common/themes/Color'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'

const Stop = () => {
  const router = useRouter()
  const { idx } = router.query
  const [period, setPeriod] = useState<string>('')
  const [buttonClickable, setButtonClickable] = useState<boolean>(false)

  if (!idx) return
  const data = member[+idx - 1]

  const handleButtonClickable = () => setButtonClickable(true)

  const handleChangePeriod = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as string)
    handleButtonClickable()
  }

  const handleButtonClick = () => {
    alert('반영되었습니다.')
    router.push('/member')
  }

  return (
    <Stack>
      <TitleContainer
        title={'회원 활동 정지'}
        breadcrumbStrings={['회원 관리', '회원 상세', '회원 활동 정지']}
      />

      <ContentContainer>
        <Typography variant='body1'>
          {data.name}({data.nickname}) 님의 활동을 다음 기간 동안 제한합니다.
        </Typography>

        <Typography variant='body1' color={Colors.Danger}>
          ※ 본 작업은 실행 후 취소할 수 없으므로 신중히 진행하시기 바랍니다.
        </Typography>

        <FormControl fullWidth style={{ marginTop: 40 }}>
          <InputLabel>기간 선택</InputLabel>
          <Select
            value={period}
            label='기간 선택'
            onChange={handleChangePeriod}
          >
            <MenuItem value={1}>1주</MenuItem>
            <MenuItem value={2}>2주</MenuItem>
            <MenuItem value={3}>3주</MenuItem>
            <MenuItem value={10}>1개월</MenuItem>
            <MenuItem value={20}>2개월</MenuItem>
            <MenuItem value={30}>3개월</MenuItem>
          </Select>
        </FormControl>

        <Button
          disabled={!buttonClickable}
          variant='outlined'
          endIcon={<SendRounded />}
          css={style.button}
          onClick={handleButtonClick}
        >
          정지 진행하기
        </Button>
      </ContentContainer>
    </Stack>
  )
}

const style = {
  button: css`
    float: right;
    margin-top: 20px;
  `,
}

export default Stop
