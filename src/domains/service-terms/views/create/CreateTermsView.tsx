import { ContentContainer } from '@/common/ContentContainer'
import { PageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { Typography } from '@mui/material'
import { ServiceTermsForm } from '../../components/terms-form'
import { useCreateTermsView } from './useCreateTermsView'

export const CreateTermsView = () => {
  const { data } = useCreateTermsView()
  const { breadcrumbModels, formProps } = data

  return (
    <PageTemplate
      pageTitle={'이용약관 작성'}
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
        <ServiceTermsForm {...formProps} />
      </ContentContainer>
    </PageTemplate>
  )
}
