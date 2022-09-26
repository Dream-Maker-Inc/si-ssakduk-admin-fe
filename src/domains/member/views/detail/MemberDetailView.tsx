import { DataRow } from '@/common/components/DataRow'
import { SubtitleContainer } from '@/common/components/SubtitleContainer'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { css } from '@emotion/react'
import { BlockRounded } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import Image from 'next/image'
import { Fragment } from 'react'
import { MemberBlindCancelDialog } from '../blind/MemberBlindCancelDialog'
import { MemberBlindDialog } from '../blind/MemberBlindDialog'
import { useMemberDetailView } from './useMemberDetailView'

type MemberDetailViewProps = {
  id: string
}

export const MemberDetailView = ({ id }: MemberDetailViewProps) => {
  const { memberFetchState, data } = useMemberDetailView(id)
  const { isError } = memberFetchState

  if (isError || !data) return <Fragment />

  const {
    member,
    breadcrumbModels,
    memberDeleteDialogProps,
    blockOptionIconProps,
  } = data

  return (
    <Fragment>
      <article css={st.root}>
        <section css={st.headerSection}>
          <TitleContainer
            title={'회원 상세'}
            breadcrumbModels={breadcrumbModels}
          />

          <SubtitleContainer
            title={'정보 보기'}
            right={<BlockOptionIcon {...blockOptionIconProps} />}
          />
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
                content={member.createdAt}
                isBottomBorder
              />
              <DataRow
                title='활동 중지 여부'
                content={<Typography>{member.blockedText}</Typography>}
                isBottomBorder
              />
              <DataRow title='회원 탈퇴 여부' content={member.leavedText} />
            </section>
          </div>
        </ContentContainer>
      </article>

      {member.isBlock ? (
        <MemberBlindCancelDialog {...memberDeleteDialogProps} />
      ) : (
        <MemberBlindDialog {...memberDeleteDialogProps} />
      )}
    </Fragment>
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

type BlockOptionIconProps = {
  isBlock: boolean
  tooltip: string
  onToggle: () => void
}

const BlockOptionIcon = ({
  isBlock,
  tooltip,
  onToggle,
}: BlockOptionIconProps) => {
  const iconColor = isBlock ? 'error' : 'default'

  return (
    <Tooltip title={tooltip}>
      <IconButton size={'small'} color={iconColor} onClick={onToggle}>
        <BlockRounded />
      </IconButton>
    </Tooltip>
  )
}
