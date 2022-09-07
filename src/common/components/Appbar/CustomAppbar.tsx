import {
  AppBar,
  AppBarProps,
  IconButton,
  Toolbar,
  ToolbarProps,
  Typography,
} from '@mui/material'
import { css } from '@emotion/react'
import Image from 'next/image'
import logo from '../../../../public/logo.svg'
import { PersonRounded } from '@mui/icons-material'
import Stack from '@mui/material/Stack'

export interface CustomAppbarProps {
  appbarProps?: AppBarProps
  toolbarProps?: ToolbarProps
}

export const CustomAppbar = ({
  appbarProps,
  toolbarProps,
}: CustomAppbarProps) => {
  return (
    <AppBar position='static' {...appbarProps}>
      <Toolbar {...toolbarProps} disableGutters css={style.root}>
        <Stack direction='row' alignItems='center'>
          <Image src={logo} alt={'싹둑'} height={20} width={60} />

          <Typography variant={'subtitle1'} color='#fff'>
            싹둑 관리자페이지
          </Typography>
        </Stack>
        <IconButton aria-label='계정' size='large' css={style.myPageIcon}>
          <PersonRounded />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const style = {
  root: css`
    display: flex;
    justify-content: space-between;
  `,
  myPageIcon: css`
    color: white;
  `,
}
