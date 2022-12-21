import { ContentContainer } from '@/common/ContentContainer'
import { PageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { Typography } from '@mui/material'
import { Fragment } from 'react'
import { NoticeForm } from '../../components'
import { useUpdateNoticeView } from './useUpdateNoticeView'

export type UpdateNoticeViewProps = {
  id: number
}

export const UpdateNoticeView = ({ id }: UpdateNoticeViewProps) => {
  const { data } = useUpdateNoticeView(id)
  if (!data) return <Fragment />

  const { breadcrumbModels, formProps } = data

  return (
    <PageTemplate
      pageTitle={'공지사항 수정'}
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
        <NoticeForm {...formProps} />
      </ContentContainer>
    </PageTemplate>
  )
}
