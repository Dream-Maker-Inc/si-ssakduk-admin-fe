import { useServiceTermsView } from './useServiceTermsView'
import { Fragment } from 'react'
import { ListPageTemplate } from '@/common/templates'
import { SearchDialogWithIcon } from '@/common/components/dialogs'
import { Stack, Typography } from '@mui/material'
import { Colors } from '@/common/themes/Color'
import { CreateActionIcon } from '@/common/components/icons'

export const ServiceTermsView = () => {
  const { data } = useServiceTermsView()
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
      pageTitle='이용약관 관리'
      subtitleModel={{
        label: (
          <Typography
            variant='h6'
            fontWeight={600}
            color={Colors.TitlePrimary}
            sx={{ opacity: 0.7 }}
          >
            {'이용약관 목록'}
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
