import React from 'react'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { css } from '@emotion/react'
import Image from 'next/image'
import { useMemberDetailView } from './useMemberDetailView'
import { SubtitleContainer } from '@/common/components/SubtitleContainer'
import { DataRow } from '@/common/components/DataRow'

type MemberDetailViewProps = {
  id: string
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
              src={memberData.profileImage}
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
              content={memberData.createdDate.toLocaleDateString()}
              isBottomBorder
            />
            <DataRow
              title='활동 중지 여부'
              content={memberData.suspendedTextWithDate}
              isBottomBorder
            />
            <DataRow title='회원 탈퇴 여부' content={memberData.leavedText} />
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
