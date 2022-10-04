import { SearchDialogWithIcon } from '@/common/components/dialogs'
import { ListPageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { Typography } from '@mui/material'
import { Fragment } from 'react'
import { usePostingsView } from './usePostingsView'

export const PostingsView = () => {
  const { data } = usePostingsView()
  if (!data) return <Fragment />

  const {
    dataTableProps,
    paginationState,
    breadcrumbModels,
    searchDialogProps,
    openSearchDialog,
  } = data

  return (
    <ListPageTemplate
      pageTitle='게시글 관리'
      subtitleModel={{
        label: (
          <Typography
            variant='h6'
            fontWeight={600}
            color={Colors.TitlePrimary}
            sx={{ opacity: 0.7 }}
          >
            {'게시글 목록'}
          </Typography>
        ),
        right: (
          <SearchDialogWithIcon
            openSearchDialog={openSearchDialog}
            searchDialogProps={searchDialogProps}
          />
        ),
      }}
      dataTableProps={dataTableProps}
      paginationState={paginationState}
      breadcrumbModels={breadcrumbModels}
    />
  )
}
