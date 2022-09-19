import { css } from '@emotion/react'
import { MenuItem, Pagination, Select, Stack } from '@mui/material'
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
  filterState?: {
    value: string
    onChange: (v: string) => void
    items: string[]
  }
}

export const ListPageTemplate = (props: ListPageTemplateProps) => {
  const {
    pageTitle,
    pageSubtitle,
    filterState,
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
          <Stack direction={'row'} gap={'8px'}>
            {filterState && (
              <Select
                size={'small'}
                css={st.filter}
                value={filterState.value}
                onChange={e => filterState.onChange(e.target.value)}
              >
                {filterState.items.map(it => (
                  <MenuItem key={it} value={it}>
                    {it}
                  </MenuItem>
                ))}
              </Select>
            )}
            <SearchBar
              textFieldProps={{
                value: keywordState.value,
                onChange: e => keywordState.onChange(e.target.value),
              }}
              onEndIconClick={keywordState.onSubmit}
            />
          </Stack>
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
  filter: css`
    background-color: #fff;
  `,
}

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
