import { DataRow } from '@/common/components/DataRow'
import { BlindDialogActionIcon } from '@/common/components/dialogs/BlindDialog'
import { ContentContainer } from '@/common/ContentContainer'
import { RouterPath } from '@/common/router'
import { PageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { Card, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { usePostingView } from './usePostingView'

type PostingViewProps = {
  id: string
}

export const PostingView = ({ id }: PostingViewProps) => {
  const { data } = usePostingView(id)
  if (!data) return <Fragment />

  const { posting, breadcrumbModels, blindDialogActionIconProps } = data
  const { author, blind } = posting

  return (
    <PageTemplate
      pageTitle='게시글 상세'
      subtitleModel={{
        label: (
          <Typography
            variant='h6'
            fontWeight={600}
            color={Colors.TitlePrimary}
            sx={{ opacity: 0.7 }}
          >
            {'상세 보기'}
          </Typography>
        ),
        right: <BlindDialogActionIcon {...blindDialogActionIconProps} />,
      }}
      breadcrumbModels={breadcrumbModels}
    >
      <ContentContainer>
        <Stack direction={'row'} gap={'100px'}>
          <Stack width={'100%'}>
            <DataRow
              title={'게시글 번호'}
              content={<Typography>{posting.id}</Typography>}
              isBottomBorder
            />
            <DataRow
              title='제목'
              content={<Typography>{posting.title}</Typography>}
              isBottomBorder
            />
            <DataRow
              title='카테고리'
              content={<Typography>{posting.category}</Typography>}
              isBottomBorder
            />
            <DataRow
              title={'작성자 닉네임'}
              content={
                <Link href={RouterPath.Member.createPathWithId(`${author.id}`)}>
                  <div css={st.anchor}>
                    <Typography>{author.name}</Typography>
                  </div>
                </Link>
              }
              isBottomBorder
            />
          </Stack>

          <Stack width={'100%'}>
            <DataRow
              title='좋아요 수'
              content={<Typography>{posting.likedCount}</Typography>}
              isBottomBorder
            />
            <DataRow
              title='댓글 수'
              content={
                <Link
                  href={`${RouterPath.Comments.path}?filter=postingId&postingId=${posting.id}`}
                >
                  <div css={st.anchor}>
                    <Typography>{posting.commentCount}</Typography>
                  </div>
                </Link>
              }
              isBottomBorder
            />
            <DataRow
              title='등록 일자'
              content={<Typography>{posting.createdAt}</Typography>}
              isBottomBorder
            />
            <DataRow
              title='최종 수정 일자'
              content={<Typography>{posting.updatedAt}</Typography>}
              isBottomBorder
            />
          </Stack>
        </Stack>

        <Stack>
          <DataRow
            title='조회 수'
            content={<Typography>{posting.viewCount}</Typography>}
            isBottomBorder
          />

          <DataRow
            title='내용'
            content={<Typography>{posting.content}</Typography>}
            isBottomBorder
          />

          <DataRow
            title='첨부 파일'
            content={
              <Stack direction={'row'} gap={'16px'}>
                {posting.attachments.map(it => (
                  <Card
                    key={it}
                    css={css`
                      position: relative;
                      width: 80px;
                      aspect-ratio: 1;
                      border-radius: 4px;
                      overflow: hidden;
                    `}
                  >
                    <Image src={it} alt={'첨부 파일'} layout={'fill'} />
                  </Card>
                ))}
              </Stack>
            }
            isBottomBorder
          />

          <DataRow
            title='블라인드'
            content={<Typography>{blind.reason}</Typography>}
            isBottomBorder
          />
        </Stack>
      </ContentContainer>
    </PageTemplate>
  )
}

const st = {
  anchor: css`
    text-decoration: underline;
    cursor: pointer;
  `,
}
