import { ListPageTemplate } from '@/common/templates'
import { useMembersView } from './useMembersView'
import React, { Fragment } from 'react'
import { SearchDialog } from '@/common/components/dialogs'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { Colors } from '@/common/themes/Color'
import { SearchRounded } from '@mui/icons-material'
import { css } from '@emotion/react'

export const MembersView = () => {
  const { data } = useMembersView()

  if (!data) return <Fragment />

  const {
    dataTableProps,
    paginationState,
    breadcrumbModels,
    searchDialogProps,
    openSearchDialog,
  } = data

  return (
    <>
      <ListPageTemplate
        pageTitle='회원 관리'
        subtitleModel={{
          label: (
            <Typography
              variant='h6'
              fontWeight={600}
              color={Colors.TitlePrimary}
              sx={{ opacity: 0.7 }}
            >
              {'회원 목록'}
            </Typography>
          ),
          right: (
            <Tooltip title={'상세 검색'}>
              <IconButton
                size={'small'}
                css={st.optionIcon}
                onClick={openSearchDialog}
              >
                <SearchRounded />
              </IconButton>
            </Tooltip>
          ),
        }}
        dataTableProps={dataTableProps}
        paginationState={paginationState}
        breadcrumbModels={breadcrumbModels}
      />
      <SearchDialog {...searchDialogProps} />
    </>
  )
}

const st = {
  optionIcon: css`
    background-color: ${Colors.BackgroundDefault};
    border: 1px solid #eee;
    border-radius: 4px;
  `,
}
