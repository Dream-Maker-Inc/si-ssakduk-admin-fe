import { Typography } from '@mui/material'
import { ReactNode } from 'react'
import { ContentContainer } from '../ContentContainer'
import { Colors } from '../themes/Color'
import { PageTemplate } from './PageTemplate'

export type DeletePageTemplateProps = {
  pageTitle: string
  pageSubtitle: ReactNode
  breadcrumbModels: {
    displayName: string
    path: string
  }[]
  contentModel: {
    title: string
    subtitle: string
    children: ReactNode
  }
}

export const DeletePageTemplate = (props: DeletePageTemplateProps) => {
  const { pageTitle, pageSubtitle, breadcrumbModels, contentModel } = props
  const { title, subtitle, children } = contentModel

  return (
    <PageTemplate
      pageTitle={pageTitle}
      subtitleModel={{
        label: pageSubtitle,
      }}
      breadcrumbModels={breadcrumbModels}
    >
      <ContentContainer>
        <div>
          <Typography variant='body1'>{title}</Typography>

          <Typography variant='body1' color={Colors.Danger}>
            {subtitle}
          </Typography>
        </div>

        {children}
      </ContentContainer>
    </PageTemplate>
  )
}
