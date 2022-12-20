import { DataRow } from '@/common/components/DataRow'
import { BlindDialogActionIcon } from '@/common/components/dialogs/BlindDialog'
import { ContentContainer } from '@/common/ContentContainer'
import { PageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { DeleteForeverRounded, EditRounded } from '@mui/icons-material'
import { IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { Fragment } from 'react'
import { useNoticeView } from './useNoticeView'

type NoticeView = {
  id: number
}

export const NoticeView = ({ id }: NoticeView) => {
  const { data } = useNoticeView(id)
  if (!data) return <Fragment />

  const {
    notice,
    breadcrumbModels,
    blindDialogActionIconProps,
    handleEditClick,
  } = data

  return (
    <PageTemplate
      pageTitle='공지사항 상세'
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
              content={<Typography>{notice.id}</Typography>}
              isBottomBorder
            />
            <DataRow
              title='제목'
              content={<Typography>{notice.title}</Typography>}
              isBottomBorder
            />
          </Stack>

          <Stack width={'100%'}>
            <DataRow
              title='등록 일자'
              content={<Typography>{notice.createdAt}</Typography>}
              isBottomBorder
            />
            <DataRow
              title='최종 수정 일자'
              content={<Typography>{notice.updatedAt}</Typography>}
              isBottomBorder
            />
          </Stack>
        </Stack>

        <Stack width={'100%'}>
          <DataRow
            title='내용'
            content={<Typography>{notice.content}</Typography>}
            isBottomBorder
          />
        </Stack>
      </ContentContainer>
    </PageTemplate>
  )
}
