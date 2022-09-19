import { SearchDialog } from '@/common/components/dialogs'
import { ListPageTemplate2 } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { usePostingsView } from './usePostingsView'
import React from 'react'
import { SearchRounded } from '@mui/icons-material'
import { css } from '@emotion/react'

export const PostingsView = () => {
  const { data } = usePostingsView()
  if (!data) return <></>

  const {
    dataTableProps,
    paginationState,
    breadcrumbModels,
    searchDialogProps,
    openSearchDialog,
  } = data

  return (
    <>
      <ListPageTemplate2
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
