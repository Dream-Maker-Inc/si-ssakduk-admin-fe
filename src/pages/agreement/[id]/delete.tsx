import { SyntheticEvent, useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import SendRounded from '@mui/icons-material/SendRounded'

import { Colors } from '@/common/themes/Color'
import { agreement } from '@/data/agreement'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'

const Delete = () => {
  const router = useRouter()
  const { id } = router.query

  const [checked, setChecked] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  if (!id) return
  const data = agreement[+id - 1]
  if (!data) return

  const handleCheckboxChecked = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    target.checked ? setChecked(true) : setChecked(false)
    checked ? handleButtonClickable() : setButtonDisabled(false)
  }

  const handleButtonClickable = () => setButtonDisabled(true)

  const handleButtonClick = () => {
    alert('반영되었습니다.')
    router.push('/community')
  }

  return (
    <Stack>
      <TitleContainer
        title={'약관 삭제'}
        breadcrumbStrings={['약관 관리', '약관 상세', '약관 글 삭제']}
      />

      <ContentContainer>
        <Typography variant='body1'>
          [{data.title}] 게시물을 삭제 처리합니다.
        </Typography>

        <Typography variant='body1' color={Colors.Danger}>
          ※ 본 작업은 실행 후 취소할 수 없으므로 신중히 진행하시기 바랍니다.
        </Typography>

        <FormControlLabel
          control={<Checkbox />}
          label='동의합니다.'
          onChange={handleCheckboxChecked}
        />

        <Button
          disabled={buttonDisabled}
          variant='outlined'
          endIcon={<SendRounded />}
          css={style.button}
          onClick={handleButtonClick}
        >
          약관 삭제하기
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

export default Delete
