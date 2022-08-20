import Stack from '@mui/material/Stack'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { ChangeEvent, useState } from 'react'
import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import SendRounded from '@mui/icons-material/SendRounded'
import { Checkbox, FormControlLabel } from '@mui/material'
import { agreement } from '@/data/agreement'

const Delete = () => {
  const router = useRouter()
  const { id } = router.query
  const data = agreement[id - 1]

  const [checked, setChecked] = useState(false)
  const [buttonClickable, setButtonClickable] = useState(false)

  const handleCheckboxChecked = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChecked(true)
    } else setChecked(false)

    if (checked) {
      handleButtonClickable()
    } else {
      setButtonClickable(false)
    }
  }

  const handleButtonClickable = () => setButtonClickable(true)

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
          disabled={!buttonClickable}
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
