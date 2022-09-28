import { ContentContainer } from '@/common/ContentContainer'
import { PageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { Typography } from '@mui/material'
import { Fragment } from 'react'
import { LifePostingForm } from '../../components/life-posting-form'
import { useUpdateLifePostingView } from './useUpdateLifePostingView'

export type UpdateLifePostingViewProps = {
  id: number
}

export const UpdateLifePostingView = ({ id }: UpdateLifePostingViewProps) => {
  const { data } = useUpdateLifePostingView(id)
  if (!data) return <Fragment />

  const { breadcrumbModels, formProps } = data

  return (
    <PageTemplate
      pageTitle={'라이프 글 수정'}
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
        <LifePostingForm {...formProps} />
      </ContentContainer>
    </PageTemplate>
  )
}
