import { DataRow } from '@/common/components/DataRow'
import { BlindDialogActionIcon } from '@/common/components/dialogs/BlindDialog'
import { ContentContainer } from '@/common/ContentContainer'
import { PageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { DeleteForeverRounded, EditRounded } from '@mui/icons-material'
import { Card, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import Image from 'next/image'
import { Fragment } from 'react'
import { useLifePostingView } from './useLifePostingView'

type LifePostingViewProps = {
  id: string
}

export const LifePostingView = ({ id }: LifePostingViewProps) => {
  const { data } = useLifePostingView(+id)
  if (!data) return <Fragment />

  const {
    lifePosting,
    breadcrumbModels,
    blindDialogActionIconProps,
    handleEditClick,
  } = data

  return (
    <PageTemplate
      pageTitle='라이프 상세'
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
        right: (
          <Stack direction={'row'}>
            <Tooltip title={'수정'}>
              <IconButton size={'small'} onClick={handleEditClick}>
                <EditRounded />
              </IconButton>
            </Tooltip>

            <BlindDialogActionIcon
              {...blindDialogActionIconProps}
              icon={<DeleteForeverRounded />}
            />
          </Stack>
        ),
      }}
      breadcrumbModels={breadcrumbModels}
    >
      <ContentContainer>
        <Stack direction={'row'} gap={'100px'}>
          <Stack width={'100%'}>
            <DataRow
              title={'게시글 번호'}
              content={lifePosting.id}
              isBottomBorder
            />
            <DataRow title='제목' content={lifePosting.title} isBottomBorder />
          </Stack>

          <Stack width={'100%'}>
            <DataRow
              title='등록 일자'
              content={lifePosting.createdAt}
              isBottomBorder
            />
            <DataRow
              title='최종 수정 일자'
              content={lifePosting.updatedAt}
              isBottomBorder
            />
          </Stack>
        </Stack>

        <Stack>
          <DataRow
            title='조회 수'
            content={lifePosting.viewCount}
            isBottomBorder
          />

          <DataRow
            title='내용'
            content={<Typography>{lifePosting.content}</Typography>}
            isBottomBorder
          />

          <DataRow
            title='첨부 파일'
            content={
              <Stack direction={'row'} gap={'16px'}>
                {lifePosting.attachments?.map(it => (
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
