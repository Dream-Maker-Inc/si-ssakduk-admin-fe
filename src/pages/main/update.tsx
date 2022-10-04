import { useRouter } from 'next/router'
import { useState } from 'react'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { RouterPath, withAuth } from '@/common/router'
import { css } from '@emotion/react'

const MainUpdatePage = () => {
  const router = useRouter()

  const [buttonClickable, setButtonClickable] = useState<boolean>(false)
  const handleButtonClickable = () => setButtonClickable(true)

  const handleSubmit = () => {
    alert('수정되었습니다.')
    router.push('/main')
  }

  const handleCancel = () => router.back()
  //'메인화면 관리', '메인화면 텍스트 수정'

  const { Main, MainUpdate } = RouterPath
  const breadcrumbModels = [
    {
      displayName: '메인화면 관리',
      path: Main.path,
    },
    {
      displayName: '메인화면 수정',
      path: MainUpdate.path,
    },
  ]

  return (
    <Stack>
      <TitleContainer
        title={'메인화면 텍스트 수정'}
        breadcrumbModels={breadcrumbModels}
      />

      <ContentContainer>
        <article>
          <TextField
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

        <Stack direction='row' justifyContent={'flex-end'} gap={'8px'}>
          <Button variant='outlined' css={style.button} onClick={handleCancel}>
            취소
          </Button>
          <Button
            disabled={!buttonClickable}
            variant='contained'
            css={style.button}
            onClick={handleSubmit}
          >
            수정
          </Button>
        </Stack>
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

export default withAuth(MainUpdatePage)
