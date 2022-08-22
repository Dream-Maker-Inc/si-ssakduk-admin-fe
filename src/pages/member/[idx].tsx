import Stack from '@mui/material/Stack'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import Typography from '@mui/material/Typography'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { member } from '@/data/member'
import { Divider, IconButton } from '@mui/material'
import { CancelRounded } from '@mui/icons-material'
import Link from 'next/link'

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

  return (
    <Stack>
      <TitleContainer
        title={'회원 상세'}
        breadcrumbStrings={['회원 관리', '회원 상세']}
      />

      <ContentContainer>
        <Stack direction='row' justifyContent='flex-end'>
          <Link href={`/member/${data.idx}/stop`}>
            <IconButton>
              <CancelRounded aria-label='활동 중지하기' />
            </IconButton>
          </Link>
        </Stack>

        <Stack>
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
        </Stack>
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
