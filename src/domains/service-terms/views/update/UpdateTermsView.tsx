import { ContentContainer } from '@/common/ContentContainer'
import { PageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { Typography } from '@mui/material'
import { Fragment } from 'react'
import { ServiceTermsForm } from '../../components/terms-form'
import { useUpdateTermsView } from './useUpdateTermsView'

export type UpdateTermsViewProps = {
  id: number
}

export const UpdateTermsView = ({ id }: UpdateTermsViewProps) => {
  const { data } = useUpdateTermsView(id)
  if (!data) return <Fragment />

  const { breadcrumbModels, formProps } = data

  return (
    <PageTemplate
      pageTitle={'이용약관 수정'}
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
