import { css } from '@emotion/react'
import { Pagination } from '@mui/material'
import { ReactNode } from 'react'
import { DataTable, DataTableProps } from '../components/DataTable'
import { SearchBar } from '../components/SearchBar'
import { PageTemplate } from './PageTemplate'

export type ListPageTemplateProps = {
  pageTitle: string
  pageSubtitle: ReactNode
  breadcrumbModels: {
    displayName: string
    path: string
  }[]
  keywordState: {
    value: string
    onChange: (v: string) => void
    onSubmit: () => void
  }
  dataTableProps: DataTableProps
  paginationState: {
    count: number
    page: number
    onChange: (v: number) => void
  }
}

export const ListPageTemplate = (props: ListPageTemplateProps) => {
  const {
    pageTitle,
    pageSubtitle,
    keywordState,
    dataTableProps,
    paginationState,
    breadcrumbModels,
  } = props

  return (
    <PageTemplate
      pageTitle={pageTitle}
      subtitleModel={{
        label: pageSubtitle,
        right: (
          <SearchBar
            textFieldProps={{
              value: keywordState.value,
              onChange: e => keywordState.onChange(e.target.value),
            }}
            onEndIconClick={keywordState.onSubmit}
          />
        ),
      }}
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
}
