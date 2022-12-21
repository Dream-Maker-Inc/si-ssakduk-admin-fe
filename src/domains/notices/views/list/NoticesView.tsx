import { SearchDialogWithIcon } from '@/common/components/dialogs'
import { CreateActionIcon } from '@/common/components/icons'
import { ListPageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { Stack, Typography } from '@mui/material'
import { Fragment } from 'react'
import { useNoticesView } from './useNoticesView'

export const NoticesView = () => {
  const { data } = useNoticesView()
  if (!data) return <Fragment />

  const {
    dataTableProps,
    paginationState,
    breadcrumbModels,
    searchDialogProps,
    openSearchDialog,
    createActionIconProps,
  } = data

  return (
    <ListPageTemplate
      pageTitle='공지사항 관리'
      subtitleModel={{
        label: (
          <Typography
            variant='h6'
            fontWeight={600}
            color={Colors.TitlePrimary}
            sx={{ opacity: 0.7 }}
          >
            {'공지사항 목록'}
          </Typography>
        ),
        right: (
          <Stack direction={'row'} gap={'8px'}>
            <SearchDialogWithIcon
              openSearchDialog={openSearchDialog}
              searchDialogProps={searchDialogProps}
            />

            <CreateActionIcon {...createActionIconProps} />
          </Stack>
        ),
      }}
      dataTableProps={dataTableProps}
      paginationState={paginationState}
      breadcrumbModels={breadcrumbModels}
    />
  )
}
