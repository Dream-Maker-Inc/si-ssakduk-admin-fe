import { DataRow } from '@/common/components/DataRow'
import { ContentContainer } from '@/common/ContentContainer'
import { PageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { DeleteForeverRounded } from '@mui/icons-material'
import { Button, Card, Stack, Switch, Typography } from '@mui/material'
import { usePostingView } from './usePostingView'
import { css } from '@emotion/react'
import Image from 'next/image'
import React from 'react'

type PostingViewProps = {
  id: string
}

export const PostingView = ({ id }: PostingViewProps) => {
  const { data } = usePostingView(id)
  if (!data) return <></>

  const { postingDetail, breadcrumbModels, handleBlind } = data
  const { posting, likedCount, commentCount, member: author } = postingDetail

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
      }}
      breadcrumbModels={breadcrumbModels}
    >
      <ContentContainer>
        <Stack direction={'row'} gap={'100px'}>
          <Stack width={'100%'}>
            <DataRow
              title={'게시글 번호'}
              content={posting.id}
              isBottomBorder
            />
            <DataRow title='제목' content={posting.title} isBottomBorder />
            <DataRow
              title='카테고리'
              content={posting.categoryModel.label}
              isBottomBorder
            />
            <DataRow
              title={'작성자 이름(닉네임)'}
              content={author.name}
              isBottomBorder
            />
          </Stack>

          <Stack width={'100%'}>
            <DataRow title='좋아요 수' content={likedCount} isBottomBorder />
            <DataRow title='댓글 수' content={commentCount} isBottomBorder />
            <DataRow
              title='등록 일자'
              content={posting.createdDate.toLocaleString()}
              isBottomBorder
            />
            <DataRow
              title='최종 수정 일자'
              content={posting.updatedDate.toLocaleString()}
              isBottomBorder
            />
          </Stack>
        </Stack>

        <Stack>
          <DataRow title='조회 수' content={posting.viewCount} isBottomBorder />

          <DataRow title='내용' content={posting.content} isBottomBorder />

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
            title='게시글 숨김'
            content={
              <Switch
                checked={posting.isBlind}
                onChange={e => handleBlind(e.target.checked)}
              />
            }
            isBottomBorder
          />
        </Stack>
      </ContentContainer>
    </PageTemplate>
  )
}
