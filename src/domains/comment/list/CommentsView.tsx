import { CommentInfoBox } from '@/common/components/CommentInfoBox'
import { SearchDialogWithIcon } from '@/common/components/dialogs'
import { PageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { Pagination, Typography } from '@mui/material'
import { Fragment } from 'react'
import { useCommentsView } from './useCommentsView'

export const CommentsViewQuery = {
  PostingId: 'postingId',
}

export const CommentsView = () => {
  const { data } = useCommentsView()
  if (!data) return <Fragment />

  const {
    commentInfoBoxProps,
    openSearchDialog,
    searchDialogProps,
    breadcrumbModels,
    paginationState,
  } = data

  return (
    <Fragment>
      <PageTemplate
        pageTitle={'댓글 관리'}
        subtitleModel={{
          label: (
            <Typography
              variant='h6'
              fontWeight={600}
              color={Colors.TitlePrimary}
              sx={{ opacity: 0.7 }}
            >
              {'댓글 목록'}
            </Typography>
          ),
          right: (
            <SearchDialogWithIcon
              openSearchDialog={openSearchDialog}
              searchDialogProps={searchDialogProps}
            />
          ),
        }}
        breadcrumbModels={breadcrumbModels}
      >
        <div>
          {commentInfoBoxProps.map((it, index) => (
            <CommentInfoBox key={index} {...it} />
          ))}
        </div>

        <div css={st.paginationContainer}>
          <Pagination
            color={'primary'}
            shape='rounded'
            count={paginationState.count}
            page={paginationState.page}
            onChange={(_, page) => paginationState.onChange(page)}
          />
        </div>
      </PageTemplate>
    </Fragment>
  )
}

const st = {
  optionIcon: css`
    background-color: ${Colors.BackgroundDefault};
    border: 1px solid #eee;
    border-radius: 4px;
  `,
  paginationContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
}
