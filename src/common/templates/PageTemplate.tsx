import { css } from '@emotion/react'
import { Stack } from '@mui/material'
import { ReactNode } from 'react'
import { TitleContainer } from '../components/TitleContainer'

export type PageTemplateProps = {
  pageTitle: string
  breadcrumbModels: {
    displayName: string
    path: string
  }[]
  subtitleModel: {
    label: ReactNode
    right?: ReactNode
  }
  children?: ReactNode
}

export const PageTemplate = (props: PageTemplateProps) => {
  const { pageTitle, subtitleModel, breadcrumbModels, children } = props

  return (
    <Stack gap={'24px'}>
      <Stack gap={'12px'}>
        <TitleContainer title={pageTitle} breadcrumbModels={breadcrumbModels} />

        <div css={st.subTitleRow}>
          {subtitleModel.label && subtitleModel.label}
          {subtitleModel.right && subtitleModel.right}
        </div>
      </Stack>

      {children}
    </Stack>
  )
}

const st = {
  subTitleRow: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
}
