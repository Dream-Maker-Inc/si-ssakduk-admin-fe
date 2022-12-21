import { ContentContainer } from '@/common/ContentContainer'
import { PageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { Typography } from '@mui/material'
import { NoticeForm } from '../../components'
import { useCreateNoticeView } from './useCreateNoticeView'

export const CreateNoticeView = () => {
  const { data } = useCreateNoticeView()
  const { breadcrumbModels, formProps } = data

  return (
    <PageTemplate
      pageTitle={'공지사항 작성'}
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
