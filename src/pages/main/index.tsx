import { css } from '@emotion/react'
import Link from 'next/link'

import EditRounded from '@mui/icons-material/EditRounded'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { RouterPath, withAuth } from '@/common/router'

const MainPage = () => {
  const breadcrumbModels = [
    {
      displayName: '메인화면 관리',
      path: RouterPath.Main.path,
    },
  ]

  return (
    <Stack>
      <TitleContainer
        title='메인화면 관리'
        breadcrumbModels={breadcrumbModels}
      />

      <ContentContainer>
        <Stack css={style.root}>
          <article css={style.content}>
            <Typography variant='body2'>
              자책하지 말아요
              <br />
              당신의 잘못이 아닙니다
              <br />
              <br />
              홀로 감당하기엔 너무 큰 고통
              <br />
              앞으로는 함께 해결합시다
              <br />
              <br />
              누구에게도 말 못할 괴로움을
              <br />
              여기 이곳에 두고 가시길
            </Typography>
          </article>
          <Link href='/main/edit'>
            <IconButton aria-label='수정하기' size='small'>
              <EditRounded />
            </IconButton>
          </Link>
        </Stack>
      </ContentContainer>
    </Stack>
  )
}

const style = {
  root: css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  `,
  content: css`
    display: flex;
  `,
}

export default withAuth(MainPage)
