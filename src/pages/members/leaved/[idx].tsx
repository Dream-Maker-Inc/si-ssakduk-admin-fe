import { css } from '@emotion/react'
import { useRouter } from 'next/router'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { member } from '@/data/member'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { RouterPath } from '@/common/router'

type DataRowProps = {
  title: string
  content: string | number
}

const DataRow = ({ title, content }: DataRowProps) => (
  <article css={style.root}>
    <Typography css={style.title} variant='body1'>
      {title}
    </Typography>
    <Typography variant='body2'>{content}</Typography>
  </article>
)

const Detail = () => {
  const router = useRouter()
  const { idx } = router.query
  if (!idx) return
  const data = member[+idx - 1]

  if (!data) return

  const { LeavedMembers, LeavedMember } = RouterPath
  const breadcrumbModels = [
    {
      displayName: '탈퇴 회원 관리',
      path: LeavedMembers.path,
    },
    {
      displayName: '탈퇴 회원 상세',
      path: LeavedMember.createPath(`${idx}`),
    },
  ]

  return (
    <Stack>
      <TitleContainer
        title={'탈퇴 회원 상세'}
        breadcrumbModels={breadcrumbModels}
      />

      <ContentContainer>
        <DataRow title='회원 번호' content={data.idx} />
        <Divider />
        <DataRow title='이름' content={data.name} />
        <Divider />
        <DataRow title='이메일' content={data.email} />
        <Divider />
        <DataRow title='휴대폰 번호' content={data.phone} />
        <Divider />
        <DataRow title='가입일자' content={data.regdate} />
        <Divider />
        <article css={style.root}>
          <Typography css={style.title} variant='body1'>
            프로필 이미지
          </Typography>
          <img src={data.profileImageUrl} alt={data.name} css={style.image} />
        </article>
        <Divider />
        <DataRow
          title='활동 중지 여부'
          content={data.isActive ? '활동 중 (정상)' : '활동 중지'}
        />
        <DataRow
          title='회원 탈퇴 여부'
          content={data.isBreak ? '활동 중 (정상)' : '탈퇴한 회원'}
        />
      </ContentContainer>
    </Stack>
  )
}

const style = {
  root: css`
    display: flex;
    align-items: center;
    min-height: 60px;
  `,
  title: css`
    width: 300px;
  `,
  image: css`
    margin-top: 20px;
    margin-bottom: 20px;
    max-width: 400px;
    max-height: 400px;
  `,
}

export default Detail