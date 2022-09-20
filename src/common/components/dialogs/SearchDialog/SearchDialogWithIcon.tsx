import { SearchRounded } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { Fragment } from 'react'
import { SearchDialog, SearchDialogProps } from './SearchDialog'
import { css } from '@emotion/react'
import { Colors } from '@/common/themes/Color'

export type SearchDialogWithIconProps = {
  openSearchDialog: () => void
  searchDialogProps: SearchDialogProps
}

export const SearchDialogWithIcon = ({
  openSearchDialog,
  searchDialogProps,
}: SearchDialogWithIconProps) => {
  return (
    <Fragment>
      <Tooltip title={'상세 검색'}>
        <IconButton
          size={'small'}
          css={st.optionIcon}
          onClick={openSearchDialog}
        >
          <SearchRounded />
        </IconButton>
      </Tooltip>

      <SearchDialog {...searchDialogProps} />
    </Fragment>
  )
}

const st = {
  optionIcon: css`
    background-color: ${Colors.BackgroundDefault};
    border: 1px solid ${Colors.Border};
    border-radius: 4px;
  `,
}
