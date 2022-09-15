import { ListPageTemplate } from '@/common/templates'
import { usePostingsView } from './usePostingsView'
import React from 'react'
import { Typography } from '@mui/material'
import { Colors } from '@/common/themes/Color'

export const PostingsView = () => {
  const { data } = usePostingsView()
  if (!data) return <></>

  const { dataTableProps, keywordState, paginationState, breadcrumbModels } =
    data

  return (
    <ListPageTemplate
      pageTitle='게시글 관리'
      pageSubtitle={
        <Typography
          variant='h6'
          fontWeight={600}
          color={Colors.TitlePrimary}
          sx={{ opacity: 0.7 }}
        >
          {'게시글 목록'}
        </Typography>
      }
      keywordState={keywordState}
      dataTableProps={dataTableProps}
      paginationState={paginationState}
      breadcrumbModels={breadcrumbModels}
    />
  )
}
