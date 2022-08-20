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
import { community } from '@/data/community'
import { Checkbox, FormControlLabel } from '@mui/material'

const Hide = () => {
  const router = useRouter()
  const { id } = router.query
  const data = community[id - 1]

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
        title={'커뮤니티 글 숨김'}
        breadcrumbStrings={[
          '커뮤니티 관리',
          '커뮤니티 상세',
          '커뮤니티 글 숨김',
        ]}
      />

      <ContentContainer>
        <Typography variant='body1'>
          {data.authorId}(닉네임) 님의 [{data.title}] 게시물을 숨김 처리합니다.
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
          게시물 숨김 처리하기
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

export default Hide
