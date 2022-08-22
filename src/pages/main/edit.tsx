import { useRouter } from 'next/router'
import { useState } from 'react'
import { css } from '@emotion/react'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import SendRounded from '@mui/icons-material/SendRounded'

import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'

const Edit = () => {
  const router = useRouter()

  const handleButtonClick = () => {
    alert('수정되었습니다.')
    router.push('/main')
  }

  const [buttonClickable, setButtonClickable] = useState<boolean>(false)
  const handleButtonClickable = () => setButtonClickable(true)

  return (
    <Stack>
      <TitleContainer
        title={'메인화면 텍스트 수정'}
        breadcrumbStrings={['메인화면 관리', '메인화면 텍스트 수정']}
      />

      <ContentContainer>
        <article>
          <TextField
            id='text'
            multiline
            fullWidth
            onChange={handleButtonClickable}
            defaultValue={`자책하지 말아요
당신의 잘못이 아닙니다


홀로 감당하기엔 너무 큰 고통
앞으로는 함께 해결합시다


누구에게도 말 못할 괴로움을
여기 이곳에 두고 가시길`}
          />
        </article>
        <Button
          disabled={!buttonClickable}
          variant='outlined'
          endIcon={<SendRounded />}
          css={style.button}
          onClick={handleButtonClick}
        >
          수정하기
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

export default Edit
