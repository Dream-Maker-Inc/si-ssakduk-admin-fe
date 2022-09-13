import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { DeleteForeverRounded } from '@mui/icons-material'
import { Button, Divider, Stack } from '@mui/material'

import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useMemberDetailView } from './useMemberDetailView'

type MemberDetailViewProps = {
  id: number
}

export const MemberDetailView = ({ id }: MemberDetailViewProps) => {
  const { memberFetchState, data } = useMemberDetailView(id)
  const { isError } = memberFetchState

  if (isError || !data) return <></>

  const { memberData, breadcrumbModels, handleMemberDelete } = data

  return (
    <article css={st.root}>
      <section css={st.headerSection}>
        <TitleContainer
          title={'회원 상세'}
          breadcrumbModels={breadcrumbModels}
        />

        <SubtitleContainer title={'정보 보기'} onDelete={handleMemberDelete} />
      </section>

      <ContentContainer>
        <div css={st.contentInner}>
          <div css={st.profileImageWrapper}>
            <Image
              src={memberData.profileImageUrl}
              alt={'profile image'}
              title={'profile image'}
              layout={'fill'}
            />
          </div>

          <section css={st.dataContainer}>
            <DataRow
              title='회원 번호'
              content={`${memberData.id}`}
              isBottomBorder
            />
            <DataRow title='이름' content={memberData.name} isBottomBorder />
            <DataRow title='이메일' content={memberData.email} isBottomBorder />
            <DataRow
              title='휴대폰 번호'
              content={memberData.phone}
              isBottomBorder
            />
            <DataRow
              title='가입일자'
              content={memberData.createdAt.toLocaleDateString()}
              isBottomBorder
            />
            <DataRow
              title='활동 중지 여부'
              content={memberData.isStopped ? '활동 중지' : '활동 중 (정상)'}
              isBottomBorder
            />
            <DataRow
              title='회원 탈퇴 여부'
              content={memberData.isLeaved ? '활동 중 (정상)' : '탈퇴한 회원'}
            />
          </section>
        </div>
      </ContentContainer>
    </article>
  )
}

const st = {
  root: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  headerSection: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  contentInner: css`
    display: flex;
    gap: 48px;
  `,
  dataContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  profileImageWrapper: css`
    position: relative;
    width: 20%;
    height: fit-content;
    aspect-ratio: 1;
    border-radius: 8px;
    overflow: hidden;
  `,
}

type DataRowProps = {
  title: string
  content: string
  isBottomBorder?: boolean
}

const DataRow = ({ title, content, isBottomBorder = false }: DataRowProps) => {
  const st = {
    root: css`
      display: flex;
      flex-direction: column;
    `,
    inner: css`
      display: flex;
      align-items: center;
      padding: 16px 0;
    `,
    title: css`
      width: 180px;
      font-weight: 500;
    `,
  }

  return (
    <div css={st.root}>
      <div css={st.inner}>
        <Typography css={st.title} variant='subtitle1'>
          {title}
        </Typography>
        <Typography variant='body2'>{content}</Typography>
      </div>

      {isBottomBorder && <Divider />}
    </div>
  )
}

//

type SubtitleContainerProps = {
  title: string
  onDelete: () => void
}

const SubtitleContainer = ({ title, onDelete }: SubtitleContainerProps) => {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems={'center'}>
      <Typography
        variant='h6'
        fontWeight={600}
        color={Colors.TitlePrimary}
        sx={{ opacity: 0.7 }}
      >
        {title}
      </Typography>

      {onDelete && (
        <Button
          variant={'outlined'}
          size={'small'}
          color={'error'}
          startIcon={<DeleteForeverRounded />}
          onClick={onDelete}
        >
          삭제
        </Button>
      )}
    </Stack>
  )
}
