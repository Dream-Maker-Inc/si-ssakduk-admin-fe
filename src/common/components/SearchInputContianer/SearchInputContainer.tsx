import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import { css } from '@emotion/react'
import Stack from '@mui/material/Stack'
import { ReactNode } from 'react'
import { SearchRounded } from '@mui/icons-material'

type SearchContainerProps = {
  containerTitle: string
  inputStartIcon: ReactNode
  inputPlaceholder: string
}

export const SearchInputContainer = ({
  containerTitle,
  inputStartIcon,
  inputPlaceholder,
}: SearchContainerProps) => (
  <Stack>
    <Typography variant='h6'>{containerTitle}</Typography>
    <section css={style.searchContainer}>
      <Paper css={style.searchBox}>
        <IconButton sx={{ p: '10px' }}>{inputStartIcon}</IconButton>
        <InputBase placeholder={inputPlaceholder} sx={{ flex: 1 }} />
        <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
          <SearchRounded />
        </IconButton>
      </Paper>
    </section>
  </Stack>
)

const style = {
  searchContainer: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
  `,
  searchBox: css`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 2px 4px;
  `,
}
