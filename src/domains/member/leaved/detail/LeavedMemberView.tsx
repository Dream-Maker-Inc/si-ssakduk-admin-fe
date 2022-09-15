import { SubtitleContainer } from '@/common/components/SubtitleContainer'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { css } from '@emotion/react'
import { Divider } from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useLeavedMemberView } from './useLeavedMemberView'
import React from 'react'

type LeavedMemberViewProps = {
  id: string
}

export const LeavedMemberView = ({ id }: LeavedMemberViewProps) => {
  const { data } = useLeavedMemberView(id)

  if (!data) return <></>

  const { member, breadcrumbModels } = data

  return (
    <article css={st.root}>
      <section css={st.headerSection}>
        <TitleContainer
          title={'회원 상세'}
          breadcrumbModels={breadcrumbModels}
        />

        <SubtitleContainer title={'정보 보기'} />
      </section>

      <ContentContainer>
        <div css={st.contentInner}>
          <div css={st.profileImageWrapper}>
            <Image
              src={member.profileImage}
              alt={'profile image'}
              title={'profile image'}
              layout={'fill'}
            />
          </div>

          <section css={st.dataContainer}>
            <DataRow
              title='회원 번호'
              content={`${member.id}`}
              isBottomBorder
            />
            <DataRow title='이름' content={member.name} isBottomBorder />
            <DataRow title='이메일' content={member.email} isBottomBorder />
            <DataRow
              title='휴대폰 번호'
              content={member.phone}
              isBottomBorder
            />
            <DataRow
              title='가입일자'
              content={member.createdDate.toLocaleDateString()}
              isBottomBorder
            />
            <DataRow
              title='활동 중지 여부'
              content={member.suspendedTextWithDate}
              isBottomBorder
            />
            <DataRow title='회원 탈퇴 여부' content={member.leavedText} />
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
    body: css`
      opacity: 0.8;
    `,
  }

  return (
    <div css={st.root}>
      <div css={st.inner}>
        <Typography css={st.title} variant='subtitle1'>
          {title}
        </Typography>
        <Typography variant='body2' css={st.body}>
          {content}
        </Typography>
      </div>

      {isBottomBorder && <Divider />}
    </div>
  )
}
