import { css } from '@emotion/react'
import { Pagination } from '@mui/material'
import { ReactNode } from 'react'
import { DataTable, DataTableProps } from '../components/DataTable'
import { PageTemplate } from './PageTemplate'

export type ListPageTemplateProps2 = {
  pageTitle: string
  subtitleModel: {
    label: ReactNode
    right?: ReactNode
  }
  breadcrumbModels: {
    displayName: string
    path: string
  }[]
  dataTableProps: DataTableProps
  paginationState: {
    count: number
    page: number
    onChange: (v: number) => void
  }
}

export const ListPageTemplate2 = (props: ListPageTemplateProps2) => {
  const {
    pageTitle,
    subtitleModel,
    dataTableProps,
    paginationState,
    breadcrumbModels,
  } = props

  return (
    <PageTemplate
      pageTitle={pageTitle}
      subtitleModel={subtitleModel}
      breadcrumbModels={breadcrumbModels}
    >
      <div css={st.tableContainer}>
        <DataTable {...dataTableProps} />

        <div css={st.tableBottomContainer}>
          <Pagination
            color={'primary'}
            shape='rounded'
            count={paginationState.count}
            page={paginationState.page}
            onChange={(_, page) => paginationState.onChange(page)}
          />
        </div>
      </div>
    </PageTemplate>
  )
}

const st = {
  tableContainer: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  tableBottomContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  filter: css`
    background-color: #fff;
  `,
}
